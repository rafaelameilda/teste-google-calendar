const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/exchange-token", async (req, res) => {
  const { code } = req.body;

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: code });

  const calendar = google.calendar({ version: "v3", auth });
  try {
    // await criarEventos(code);

    const oauth2 = google.oauth2({
      auth,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();

    const userProfile = {
      id: userInfo.data.id,
      email: userInfo.data.email,
      verified_email: userInfo.data.verified_email,
      name: userInfo.data.name,
      given_name: userInfo.data.given_name,
      family_name: userInfo.data.family_name,
      picture: userInfo.data.picture,
      locale: userInfo.data.locale,
    };

    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    res.json({ userProfile, events: events.data.items });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).json({ error: "Invalid token" });
  }
});

const criarEventos = async (accessToken) => {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth });
  // Calculate start time as current time + 5 hours
  const startDateTime = new Date(Date.now() + 5 * 60 * 60 * 1000);

  // Calculate end time as tomorrow at 13:00
  const endDateTime = new Date();
  endDateTime.setDate(endDateTime.getDate() + 1);
  endDateTime.setHours(13, 0, 0, 0);

  const event = {
    summary: "req.body.summary",
    description: "req.body.description",
    start: {
      dateTime: startDateTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: endDateTime,
      timeZone: "America/Los_Angeles",
    },
  };

  const createdEvent = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
  console.log(createdEvent);
};

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
