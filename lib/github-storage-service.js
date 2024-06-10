const { Octokit } = require('@octokit/rest');

class GithubStorageService {
  static async uploadFile(envParams, filePath, buffer) {
    try {
      const octoKit = new Octokit({ auth: envParams.accessToken });
      const fileData = buffer.toString('base64');
      await octoKit.repos.createOrUpdateFileContents({
        owner: envParams.owner,
        repo: envParams.repository,
        path: filePath,
        message: `Uploaded ${filePath}`,
        content: fileData,
        branch: envParams.branch,
      });

      return {
        status: 'success',
        response: {
          filePath,
        },
      };
    } catch (error) {
      return {
        status: 'failed',
        message: 'Error while uploading image to GitHub repository',
        response: error,
      };
    }
  }

  async deleteFile(envParams, filePath) {
    try {
      const octoKit = new Octokit({ auth: envParams.accessToken });
      const response = await octoKit.repos.getContent({
        owner: envParams.owner,
        repo: envParams.repository,
        path: filePath,
        ref: envParams.branch,
      });

      const fileSha = Array.isArray(response.data) ? null : response.data.sha;

      if (!fileSha) {
        throw new Error('File not found');
      }

      await octoKit.repos.deleteFile({
        owner: envParams.owner,
        repo: envParams.repository,
        path: filePath,
        message: `Deleted File at ${filePath}`,
        sha: fileSha,
        branch: envParams.branch,
      });

      return {
        status: 'success',
        message: 'File deleted from GitHub repository successfully.',
      };
    } catch (error) {
      return {
        status: 'failed',
        message: 'Error while deleting file',
        response: error,
      };
    }
  }

  async getUrl(envParams, filePath) {
    try {
      const octoKit = new Octokit({ auth: envParams.accessToken });
      const contentResponse = await octoKit.repos.getContent({
        owner: envParams.owner,
        repo: envParams.repository,
        path: filePath,
        ref: envParams.branch,
      });

      if (Array.isArray(contentResponse.data)) {
        throw new Error(`${filePath} is not a file`);
      }

      const fileUrl = contentResponse.data.download_url;
      return fileUrl;
    } catch (error) {
      return {
        status: 'failed',
        message: 'Error while getting file url',
        response: error,
      };
    }
  }
}

module.exports = GithubStorageService;