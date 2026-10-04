import type{CloudConnector,ConnectorInput,CloudFinding}from'./types.js';
import{severity}from'./types.js';

export const azureConnector:CloudConnector={provider:'azure',label:'Microsoft Azure',async sync(input:ConnectorInput){
  const tenant=String(input.credentials.tenantId??''),clientId=String(input.credentials.clientId??''),clientSecret=String(input.credentials.clientSecret??''),subscription=String(input.credentials.subscriptionId||input.externalRef);
  if(!tenant||!clientId||!clientSecret||!subscription)throw new Error('Azure needs tenant ID, app/client ID, client secret, and subscription ID.');
  const Credential=(await import('@azure/identity')).ClientSecretCredential,credential=new Credential(tenant,clientId,clientSecret),access=await credential.getToken('https://management.azure.com/.default');
  if(!access?.token)throw new Error('Azure identity did not return an access token.');
  let url:string|null=`https://management.azure.com/subscriptions/${encodeURIComponent(subscription)}/providers/Microsoft.Security/assessments?api-version=2021-06-01`;
  const findings:CloudFinding[]=[];
  while(url){const response=await fetch(url,{headers:{Authorization:`Bearer ${access.token}`}});if(!response.ok)throw new Error(`Azure Defender for Cloud returned ${response.status}: ${await response.text()}`);const data=await response.json() as{value?:any[];nextLink?:string};for(const x of data.value??[]){const p=x.properties??{},resourceId=p.resourceDetails?.id??x.id??'';findings.push({externalId:x.name??x.id,provider:'azure',source:'Microsoft Defender for Cloud',title:p.displayName??'Cloud security assessment',description:p.status?.description??p.metadata?.description??'',severity:severity(p.metadata?.severity??p.status?.severity),status:p.status?.code==='Healthy'?'resolved':'open',resourceId,resourceName:resourceId.split('/').pop()??'',region:p.resourceDetails?.region??'',cveIds:p.additionalData?.cve??[],lastSeen:p.status?.firstEvaluationDate?new Date(p.status.firstEvaluationDate):undefined,remediation:p.metadata?.remediationDescription??'',raw:x})}url=data.nextLink??null}
  return findings
}};
