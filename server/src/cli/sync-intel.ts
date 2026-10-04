import{syncIntelligence}from'../services/intelligence.js';import{env}from'../config.js';import mongoose from'mongoose';
try{if(env.MONGODB_URI)await mongoose.connect(env.MONGODB_URI);const result=await syncIntelligence();console.log(JSON.stringify(result,null,2))}catch(e){console.error(e);process.exitCode=1}finally{await mongoose.disconnect().catch(()=>{})}
