This package is an experimental to use github as a storage service similar to AWS S3.

This is helpful for developers who want to work on small projects and pay for storage of file, instead going for some cloud providers. We can use the power of github storage and use it as conventional storage system.

This package uses @octokit/rest a Github's rest API client.
# Bugs
If it doesn't work for you or you encounter any error. Please raise a issue with the details. 
[GITHUB REPO](https://github.com/achyut2000/github-as-storage)

# Prerequisites:

  * Github account
  * create an personal access token from github's settings page [Token creation](https://github.com/settings/tokens)
  * A repository (where you want to store the files)

## ⚠️ Caution: Personal Access Token Permissions

    > Be careful while creating a personal access token, allow only relevant permissions.

# Installation:

  * Through npm install
      ```script
      npm install github-as-storage 
      ```

  * Or in dependencies in package.json
      ```js
       dependencies: { 
          "github-as-storage": "1.0.0", 
       }, 
      ```

# Usage
  Import the package as below
  ```js
    const GithubStorageService = require('github-as-storage');
  ```

  Each function need some parameters to be passed. 
  > To perform these actions you need personal access token with access to that particular repo (to restrict access to other repos)

  > We are not storing the token for security concerns, so you need to pass it each and every time calling the below functions

  ## Functionalities
  Three functions implemented as of now:
  - Upload File:
      ```js 
      await GithubStorageService.uploadFile(envParams, filePath, fileBuffer) 
      ```

      - `envParams` : 
        ```js 
          {
            accessToken: "Your Github Token",
            owner: "Your username (case sensitive)",
            repository: "Repository name",
            branch: "branch name you want to store"
          } 
        ```

      - `filePath`: exact path where you wanna store like which folder and filename (/samples/test/sample.pdf) 
        It will store the sample.pdf inside test folder which is inside samples folder.

      - `fileBuffer`: buffer datatype of file you want to upload.
  
    - On successful upload: Will return the filepath where it is stored similar to s3Key.
      ```js  
          status: 'success',
          message: 'Image uploaded to GitHub repository successfully',
          response: {
            filePath,
          },
      ```
  - Delete File:
      ```js 
      await GithubStorageService.deleteFile(envParams, filePath) 
      ```

      - `envParams`: same as above mentioned
      - `filPath`: exact file path of the file (/samples/test/sample.pdf)
    - On successful deletion 
      ```js 
            status: 'success',
            message: 'File deleted from GitHub repository successfully.',
       ```

  - Get File URL:
      To get the url for the file you want to use it to render it wherever you want to preview.
      ```js 
      await GithubStorageService.getUrl(envParams, filePath) 
      ```

      - will return the url for that filePath.

## Support 
  Any one can feel free to improve this package functionality. visit the repo: [Github as storage](https://github.com/achyut2000/github-as-storage)

### Credits
[Blog](https://dev.to/karanjamadar/how-to-create-service-like-amazon-s3-image-upload-for-free-using-github-4gc7)