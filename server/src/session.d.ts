import session from 'express-session';
declare module 'express-session'{interface SessionData{user?:{id:string;email:string;name:string;picture?:string;organizationId:string;provider:string};csrfToken?:string;oidc?:Record<string,{state:string;nonce:string;verifier:string;createdAt:number}>}}
export {};
