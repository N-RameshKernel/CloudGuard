import{Request,Response,NextFunction}from'express';import{safeEqual,hashSecret}from'../services/crypto.js';
export function requireAuth(req:Request,res:Response,next:NextFunction){if(!req.session.user)return res.status(401).json({error:'Sign in to access this workspace.'});next()}
export function requireCsrf(req:Request,res:Response,next:NextFunction){const expected=req.session.csrfToken,provided=req.get('x-csrf-token');if(!expected||!provided||!safeEqual(hashSecret(expected),hashSecret(provided)))return res.status(403).json({error:'CSRF check failed. Refresh the page and retry.'});next()}
