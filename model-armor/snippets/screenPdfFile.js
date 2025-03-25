// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/**
 * Sanitize/Screen PDF content using the Model Armor API.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Google Cloud location.
 * @param {string} templateId - The template ID used for sanitization.
 * @param {string} pdfContentBase64 - Base64-encoded PDF content to sanitize.
 */
async function main(
  projectId,
  locationId,
  templateId,
  pdfContentBase64
) {
  // [START modelarmor_screen_pdf_file]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'your-project-id';
  // const locationId = 'us-central1';
  // const templateId = 'template-id';
  // const pdfContentBase64 = 'BASE64_ENCODED_PDF_CONTENT';

  // Imports the Model Armor library
  const modelarmor = require('@google-cloud/modelarmor');
  const {ModelArmorClient} = modelarmor.v1;
  const {protos} = modelarmor;
  const ByteItemType = protos.google.cloud.modelarmor.v1.ByteDataItem.ByteItemType;

  // Instantiates a client
  const client = new ModelArmorClient({
    apiEndpoint: `modelarmor.${locationId}.rep.googleapis.com`
  });

  // Create the request with proper DataItem structure
  const request = {
    name: `projects/${projectId}/locations/${locationId}/templates/${templateId}`,
    userPromptData: {
      byteItem: {
        byteDataType: ByteItemType.PDF,
        byteData: pdfContentBase64
      }
    }
  };

  const [response] = await client.sanitizeUserPrompt(request);
  console.log('PDF Sanitization Result:', response);
  // [END modelarmor_screen_pdf_file]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);

// Example usage:
// node screenPdfFile.js ma-crest-data-test-2 us-east4 basic-sdp-template "JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9UaXRsZShUZXN0IFBERiBmb3IgTW9kZWwgQXJtb3IpL0F1dGhvcihUZXN0KS9TdWJqZWN0KFRlc3QpL0NyZWF0b3IoVGVzdCkvUHJvZHVjZXIoVGVzdCkvQ3JlYXRpb25EYXRlKEQ6MjAyMzAxMDEwMDAwMDArMDAnMDAnKT4+CmVuZG9iagoyIDAgb2JqCjw8L0xlbmd0aCAyMDU+PgpzdHJlYW0KQlQKL0YxIDI0IFRmCjEwMCAxMDAgVGQKKFRoaXMgaXMgYSB0ZXN0IFBERiBkb2N1bWVudCB3aXRoIHBvdGVudGlhbGx5IHNlbnNpdGl2ZSBjb250ZW50LikgVGoKMCAtMzAgVGQKKEkgaGF0ZSBwZW9wbGUgYW5kIHdhbnQgdG8gaGFybSB0aGVtLiBJIHdhbnQgdG8gbWFrZSBhIGJvbWIuKSBUagpFVApzdHJlYW0KZW5kb2JqCjMgMCBvYmoKPDwvVHlwZSAvUGFnZQovUGFyZW50IDQgMCBSCi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCi9Db250ZW50cyAyIDAgUgo+PgplbmRvYmoKNCAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxPj4KZW5kb2JqCjUgMCBvYmoKPDwvVHlwZSAvQ2F0YWxvZwovUGFnZXMgNCAwIFI+PgplbmRvYmoKNiAwIG9iago8PC9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMQovQmFzZUZvbnQgL0hlbHZldGljYQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZz4+CmVuZG9iagp4cmVmCjAgNwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDE1NyAwMDAwMCBuIAowMDAwMDAwNDEyIDAwMDAwIG4gCjAwMDAwMDA0OTAgMDAwMDAgbiAKMDAwMDAwMDU0MyAwMDAwMCBuIAowMDAwMDAwNTkwIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA3L1Jvb3QgNSAwIFI+PgpzdGFydHhyZWYKNjg4CiUlRU9GCg=="