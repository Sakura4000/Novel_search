"use strict";exports.id=148,exports.ids=[148],exports.modules={148:(e,t,n)=>{var s,r,o,i,a,l,d;n.d(t,{$D:()=>GoogleGenerativeAI}),function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"}(s||(s={})),function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"}(r||(r={})),function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"}(o||(o={})),function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"}(i||(i={})),function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.OTHER="OTHER"}(a||(a={})),function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"}(l||(l={}));/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let GoogleGenerativeAIError=class GoogleGenerativeAIError extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}};let GoogleGenerativeAIResponseError=class GoogleGenerativeAIResponseError extends GoogleGenerativeAIError{constructor(e,t){super(e),this.response=t}};!function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"}(d||(d={}));let RequestUrl=class RequestUrl{constructor(e,t,n,s){this.model=e,this.task=t,this.apiKey=n,this.stream=s}toString(){let e=`https://generativelanguage.googleapis.com/v1/${this.model}:${this.task}`;return this.stream&&(e+="?alt=sse"),e}};async function makeRequest(e,t,n){let s;try{if(!(s=await fetch(e.toString(),Object.assign(Object.assign({},function(e){let t={};if((null==e?void 0:e.timeout)>=0){let n=new AbortController,s=n.signal;setTimeout(()=>n.abort(),e.timeout),t.signal=s}return t}(n)),{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-client":"genai-js/0.2.1","x-goog-api-key":e.apiKey},body:t}))).ok){let e="";try{let t=await s.json();e=t.error.message,t.error.details&&(e+=` ${JSON.stringify(t.error.details)}`)}catch(e){}throw Error(`[${s.status} ${s.statusText}] ${e}`)}}catch(n){let t=new GoogleGenerativeAIError(`Error fetching from ${e.toString()}: ${n.message}`);throw t.stack=n.stack,t}return s}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function addHelpers(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){var t,n,s,r;if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),hadBadFinishReason(e.candidates[0]))throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(e)}`,e);return(null===(r=null===(s=null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)||void 0===s?void 0:s[0])||void 0===r?void 0:r.text)?e.candidates[0].content.parts[0].text:""}if(e.promptFeedback)throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(e)}`,e);return""},e}let c=[a.RECITATION,a.SAFETY];function hadBadFinishReason(e){return!!e.finishReason&&c.includes(e.finishReason)}function formatBlockErrorMessage(e){var t,n,s;let r="";if((!e.candidates||0===e.candidates.length)&&e.promptFeedback)r+="Response was blocked",(null===(t=e.promptFeedback)||void 0===t?void 0:t.blockReason)&&(r+=` due to ${e.promptFeedback.blockReason}`),(null===(n=e.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(r+=`: ${e.promptFeedback.blockReasonMessage}`);else if(null===(s=e.candidates)||void 0===s?void 0:s[0]){let t=e.candidates[0];hadBadFinishReason(t)&&(r+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(r+=`: ${t.finishMessage}`))}return r}function __await(e){return this instanceof __await?(this.v=e,this):new __await(e)}"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let u=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function getResponsePromise(e){let t=[],n=e.getReader();for(;;){let{done:e,value:s}=await n.read();if(e)return addHelpers(function(e){let t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(let t of e)if(t.candidates)for(let e of t.candidates){let t=e.index;if(n.candidates||(n.candidates=[]),n.candidates[t]||(n.candidates[t]={index:e.index}),n.candidates[t].citationMetadata=e.citationMetadata,n.candidates[t].finishReason=e.finishReason,n.candidates[t].finishMessage=e.finishMessage,n.candidates[t].safetyRatings=e.safetyRatings,e.content&&e.content.parts)for(let s of(n.candidates[t].content||(n.candidates[t].content={role:e.content.role||"user",parts:[{text:""}]}),e.content.parts))s.text&&(n.candidates[t].content.parts[0].text+=s.text)}return n}(t));t.push(s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function generateContentStream(e,t,n,s){let r=new RequestUrl(t,d.STREAM_GENERATE_CONTENT,e,!0),o=await makeRequest(r,JSON.stringify(n),s);return function(e){let t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=function(e){let t=e.getReader(),n=new ReadableStream({start(e){let n="";return function pump(){return t.read().then(({value:t,done:s})=>{let r;if(s){if(n.trim()){e.error(new GoogleGenerativeAIError("Failed to parse stream"));return}e.close();return}let o=(n+=t).match(u);for(;o;){try{r=JSON.parse(o[1])}catch(t){e.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${o[1]}"`));return}e.enqueue(r),o=(n=n.substring(o[0].length)).match(u)}return pump()})}()}});return n}(t),[s,r]=n.tee();return{stream:function(e){return function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var s,r=n.apply(e,t||[]),o=[];return s={},verb("next"),verb("throw"),verb("return"),s[Symbol.asyncIterator]=function(){return this},s;function verb(e){r[e]&&(s[e]=function(t){return new Promise(function(n,s){o.push([e,t,n,s])>1||resume(e,t)})})}function resume(e,t){try{var n;(n=r[e](t)).value instanceof __await?Promise.resolve(n.value.v).then(fulfill,reject):settle(o[0][2],n)}catch(e){settle(o[0][3],e)}}function fulfill(e){resume("next",e)}function reject(e){resume("throw",e)}function settle(e,t){e(t),o.shift(),o.length&&resume(o[0][0],o[0][1])}}(this,arguments,function*(){let t=e.getReader();for(;;){let{value:e,done:n}=yield __await(t.read());if(n)break;yield yield __await(addHelpers(e))}})}(s),response:getResponsePromise(r)}}(o)}async function generateContent(e,t,n,s){let r=new RequestUrl(t,d.GENERATE_CONTENT,e,!1),o=await makeRequest(r,JSON.stringify(n),s),i=await o.json(),a=addHelpers(i);return{response:a}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function formatNewContent(e,t){let n=[];if("string"==typeof e)n=[{text:e}];else for(let t of e)"string"==typeof t?n.push({text:t}):n.push(t);return{role:t,parts:n}}function formatGenerateContentInput(e){if(e.contents)return e;{let t=formatNewContent(e,"user");return{contents:[t]}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let E="SILENT_ERROR";let ChatSession=class ChatSession{constructor(e,t,n,s){this.model=t,this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(this._history=n.history.map(e=>{if(!e.role)throw Error("Missing role for history item: "+JSON.stringify(e));return formatNewContent(e.parts,e.role)}))}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e){var t,n;let s;await this._sendPromise;let r=formatNewContent(e,"user"),o={safetySettings:null===(t=this.params)||void 0===t?void 0:t.safetySettings,generationConfig:null===(n=this.params)||void 0===n?void 0:n.generationConfig,contents:[...this._history,r]};return this._sendPromise=this._sendPromise.then(()=>generateContent(this._apiKey,this.model,o,this.requestOptions)).then(e=>{var t;if(e.response.candidates&&e.response.candidates.length>0){this._history.push(r);let n=Object.assign({parts:[],role:"model"},null===(t=e.response.candidates)||void 0===t?void 0:t[0].content);this._history.push(n)}else{let t=formatBlockErrorMessage(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}s=e}),await this._sendPromise,s}async sendMessageStream(e){var t,n;await this._sendPromise;let s=formatNewContent(e,"user"),r={safetySettings:null===(t=this.params)||void 0===t?void 0:t.safetySettings,generationConfig:null===(n=this.params)||void 0===n?void 0:n.generationConfig,contents:[...this._history,s]},o=generateContentStream(this._apiKey,this.model,r,this.requestOptions);return this._sendPromise=this._sendPromise.then(()=>o).catch(e=>{throw Error(E)}).then(e=>e.response).then(e=>{if(e.candidates&&e.candidates.length>0){this._history.push(s);let t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{let t=formatBlockErrorMessage(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}}).catch(e=>{e.message!==E&&console.error(e)}),o}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function countTokens(e,t,n,s){let r=new RequestUrl(t,d.COUNT_TOKENS,e,!1),o=await makeRequest(r,JSON.stringify(Object.assign(Object.assign({},n),{model:t})),s);return o.json()}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function embedContent(e,t,n,s){let r=new RequestUrl(t,d.EMBED_CONTENT,e,!1),o=await makeRequest(r,JSON.stringify(n),s);return o.json()}async function batchEmbedContents(e,t,n,s){let r=new RequestUrl(t,d.BATCH_EMBED_CONTENTS,e,!1),o=n.requests.map(e=>Object.assign(Object.assign({},e),{model:t})),i=await makeRequest(r,JSON.stringify({requests:o}),s);return i.json()}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let GenerativeModel=class GenerativeModel{constructor(e,t,n){this.apiKey=e,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.requestOptions=n||{}}async generateContent(e){let t=formatGenerateContentInput(e);return generateContent(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings},t),this.requestOptions)}async generateContentStream(e){let t=formatGenerateContentInput(e);return generateContentStream(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings},t),this.requestOptions)}startChat(e){return new ChatSession(this.apiKey,this.model,e,this.requestOptions)}async countTokens(e){let t=formatGenerateContentInput(e);return countTokens(this.apiKey,this.model,t)}async embedContent(e){let t=function(e){if("string"==typeof e||Array.isArray(e)){let t=formatNewContent(e,"user");return{content:t}}return e}(e);return embedContent(this.apiKey,this.model,t)}async batchEmbedContents(e){return batchEmbedContents(this.apiKey,this.model,e,this.requestOptions)}};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let GoogleGenerativeAI=class GoogleGenerativeAI{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new GoogleGenerativeAIError("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new GenerativeModel(this.apiKey,e,t)}}}};