require('dotenv').config();
const express = require('express')
const Mux = require('@mux/mux-node');
const { Video } = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);
const app = express()
const port = 3000

app.get('/live-streams', async (req, res) => {
    const liveStreams = await Video.LiveStreams.list();

    res.json(liveStreams.map((liveStream) => ({
        id: liveStream.id,
        status: liveStream.status,
        playback_ids: liveStream.playback_ids,
        created_at: liveStream.created_at
    })));
});

app.get('/assets', async (req, res) => {
    const Assets = await Video.Assets.list();

    res.json(Assets.map((asset) => ({
        id: asset.id,
        status: asset.status,
        playback_ids: asset.playback_ids,
        created_at: asset.created_at
    })));
});

app.listen(port, () => {
    console.log(`Mux API listening on port ${port}`)
})