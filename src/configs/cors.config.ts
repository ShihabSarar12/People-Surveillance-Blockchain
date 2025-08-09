const corsConfig = {
    origin:
        process.env.NODE_ENV === 'production'
            ? ['https://yourtrustedwebsite.com']
            : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsConfig;
