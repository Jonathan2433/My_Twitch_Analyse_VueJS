/*global process*/

import webpack from 'webpack';
require('dotenv').config();

export default {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    VUE_APP_TWITCH_CLIENT_ID: JSON.stringify(process.env.VUE_APP_TWITCH_CLIENT_ID),
                    VUE_APP_TWITCH_ACCESS_TOKEN: JSON.stringify(process.env.VUE_APP_TWITCH_ACCESS_TOKEN),
                },
            }),
        ],
    },
};
