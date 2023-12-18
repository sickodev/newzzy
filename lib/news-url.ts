const getAPIKey = () => {
    const key = process.env.GNEWS_API_KEY;
    return key;
};

export const url = `https://gnews.io/api/v4/search?apikey=${getAPIKey()}&q=`;
