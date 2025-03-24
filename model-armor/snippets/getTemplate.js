// Copyright 2019 Google LLC
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

async function main(projectId, locationId, templateId) {
  // [START modelarmor_get_template]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'my-project';
  // const locationId = 'my-location';
  // const templateId = 'my-template';

  const name = `projects/${projectId}/locations/${locationId}/templates/${templateId}`;

  // Imports the Model Armor library
  const {ModelArmorClient} = require('@google-cloud/modelarmor').v1;

  // Adding the endpoint to call the regional model armor server
  const options = {};
  options.apiEndpoint = `modelarmor.${locationId}.rep.googleapis.com`;

  // Instantiates a client
  const client = new ModelArmorClient(options);
  console.log(projectId, locationId, templateId);

  async function getModelArmorTemplate() {
    const request = {
      name: name,
    };

    // Run request
    const response = await client.getTemplate(request);
    console.log(`Template name: ${response[0].name}`);
  }

  getModelArmorTemplate();
  // [END modelarmor_get_template]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);