import type {Provider} from '../models/index.js';export type {Provider} from '../models/index.js';
export type CloudFinding={externalId:string;provider:Provider;source:string;title:string;description:string;severity:'critical'|'high'|'medium'|'low'|'info';status:'open'|'in_progress'|'resolved'|'suppressed';resourceId:string;resourceName:string;region:string;cveIds:string[];firstSeen?:Date;lastSeen?:Date;remediation:string;raw:unknown};
export type ConnectorInput={externalRef:string;regions?:string[];credentials:Record<string,unknown>};
export interface CloudConnector{provider:Provider;label:string;sync(input:ConnectorInput):Promise<CloudFinding[]>}
export const severity=(value:unknown):CloudFinding['severity']=>{const s=String(value??'').toLowerCase();if(s.includes('critical')||s==='fatal')return'critical';if(s.includes('high')||s.includes('important'))return'high';if(s.includes('medium')||s.includes('moderate'))return'medium';if(s.includes('low'))return'low';return'info'};

