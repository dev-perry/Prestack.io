import {
  webviewBuild,
  youtubeVideo,
  driveAssets,
  participationForm
} from './layouts/BuilderForms.js'

const modules = [
  {
    label: "Drive Asset",
    icon: "fas fa-hdd",
    build:{
        label: "Drive Asset",
        type: "drive"
      },
    form: driveAssets
  },
  {
    label: "Webage View",
    icon: "fas fa-globe",
    build:{
      label: "Webpage View",
      type: "internet"
    },
    form: webviewBuild
  },
  {
    label: "YouTube Video",
    icon: "fab fa-youtube",
    build: {
      label: "YouTube Video",
      type: "youtube"
    },
    form: youtubeVideo
  },
  {
    label: "Participation Module",
    icon: "fas fa-user-check",
    build: {
      label: "Participation Module",
      type: "participation"
    },
    form: participationForm
  }
];

export default modules;
