import imgur from 'imgur';

/**
 * Uploads file to imgur.
 * @param {File} file Uploads a file to imgur to keep it stored non-locally
 * @returns {string} Link to the uploaded file
 */
export const upload = async (file) => {
    // UNUSED
    const imgurClient = new imgur({ clientId: '' });
    try {
        const res = await imgurClient.upload({
            image: file,
            type: 'stream',
        });
        return res?.data?.link ?? null;
    } catch (e) {
        console.log(e);
    }
};
