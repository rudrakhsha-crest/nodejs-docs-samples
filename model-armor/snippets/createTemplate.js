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

async function main(projectId, locationId, templateId) {
  // [START modelarmor_create_template]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'your-project-id';
  // const locationId = 'us-central1';
  // const templateId = 'your-template-id';

  const parent = `projects/${projectId}/locations/${locationId}`;

  // Imports the Model Armor library
  const modelarmor = require('@google-cloud/modelarmor');
  const {ModelArmorClient} = modelarmor.v1;
  const {protos} = modelarmor;

  // Instantiates a client
  const client = new ModelArmorClient({
    apiEndpoint: `modelarmor.${locationId}.rep.googleapis.com`,
  });

  async function callCreateTemplate() {
    // Configuration for the template using proper enum values
    const templateConfig = {
      filterConfig: {
        raiSettings: {
          raiFilters: [
            {
              filterType: protos.google.cloud.modelarmor.v1.RaiFilterType.HATE_SPEECH,
              confidenceLevel: protos.google.cloud.modelarmor.v1.DetectionConfidenceLevel.HIGH,
            },
            {
              filterType: protos.google.cloud.modelarmor.v1.RaiFilterType.SEXUALLY_EXPLICIT,
              confidenceLevel: protos.google.cloud.modelarmor.v1.DetectionConfidenceLevel.MEDIUM_AND_ABOVE,
            },
          ],
        },
      },
    };

    // Construct request
    const request = {
      parent,
      templateId,
      template: templateConfig,
    };

    // Create the template
    const [response] = await client.createTemplate(request);
    console.log(`Created template: ${response.name}`);
  }

  callCreateTemplate();
  // [END modelarmor_create_template]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);

// Example usage:
// node createTemplate.js ma-crest-data-test-2 us-central1 rudyzz1