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

/**
 * Retrieves the floor settings for a Google Cloud organization.
 *
 * @param {string} organizationId - The ID of the Google Cloud organization for which to retrieve
 *                                 floor settings.
 */
async function main(organizationId) {
  // [START modelarmor_get_organization_floor_settings]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const organizationId = 'your-organization-id';

  const name = `organizations/${organizationId}/locations/global/floorSetting`;

  // Imports the Modelarmor library
  const {ModelArmorClient} = require('@google-cloud/modelarmor').v1;

  // Instantiates a client
  const modelarmorClient = new ModelArmorClient();

  async function getOrganizationFloorSettings() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await modelarmorClient.getFloorSetting(request);
    console.log(response);
  }

  getOrganizationFloorSettings();
  // [END modelarmor_get_organization_floor_settings]
}

const args = process.argv.slice(2);
main(...args).catch(console.error);
