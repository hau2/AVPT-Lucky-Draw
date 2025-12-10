import confetti from 'canvas-confetti';
import Slot from '@js/Slot';
import SoundEffects from '@js/SoundEffects';

// Initialize slot machine
(() => {
  const drawButton = document.getElementById(
    'draw-button'
  ) as HTMLButtonElement | null;
  const fullscreenButton = document.getElementById(
    'fullscreen-button'
  ) as HTMLButtonElement | null;
  const settingsButton = document.getElementById(
    'settings-button'
  ) as HTMLButtonElement | null;
  const settingsWrapper = document.getElementById(
    'settings'
  ) as HTMLDivElement | null;
  const settingsContent = document.getElementById(
    'settings-panel'
  ) as HTMLDivElement | null;
  const settingsSaveButton = document.getElementById(
    'settings-save'
  ) as HTMLButtonElement | null;
  const settingsCloseButton = document.getElementById(
    'settings-close'
  ) as HTMLButtonElement | null;
  const sunburstSvg = document.getElementById(
    'sunburst'
  ) as HTMLImageElement | null;
  const confettiCanvas = document.getElementById(
    'confetti-canvas'
  ) as HTMLCanvasElement | null;
  const nameListTextArea = document.getElementById(
    'name-list'
  ) as HTMLTextAreaElement | null;
  const removeNameFromListCheckbox = document.getElementById(
    'remove-from-list'
  ) as HTMLInputElement | null;
  const enableSoundCheckbox = document.getElementById(
    'enable-sound'
  ) as HTMLInputElement | null;
  const clearButton = document.getElementById(
    'clear-button'
  ) as HTMLButtonElement | null;

  // Graceful exit if necessary elements are not found
  if (
    !(
      drawButton
      && fullscreenButton
      && settingsButton
      && settingsWrapper
      && settingsContent
      && settingsSaveButton
      && settingsCloseButton
      && sunburstSvg
      && confettiCanvas
      && nameListTextArea
      && removeNameFromListCheckbox
      && enableSoundCheckbox
      && clearButton
    )
  ) {
    console.error('One or more Element ID is invalid. This is possibly a bug.');
    return;
  }

  if (!(confettiCanvas instanceof HTMLCanvasElement)) {
    console.error(
      'Confetti canvas is not an instance of Canvas. This is possibly a bug.'
    );
    return;
  }

  const soundEffects = new SoundEffects();
  const MAX_REEL_ITEMS = 40;
  const CONFETTI_COLORS = [
    '#26ccff',
    '#a25afd',
    '#ff5e7e',
    '#88ff5a',
    '#fcff42',
    '#ffa62d',
    '#ff36ff'
  ];
  let confettiAnimationId;

  /** Confeetti animation instance */
  const customConfetti = confetti.create(confettiCanvas, {
    resize: true,
    useWorker: true
  });

  /** Triggers cconfeetti animation until animation is canceled */
  const confettiAnimation = () => {
    const windowWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.getElementsByTagName('body')[0].clientWidth;
    const confettiScale = Math.max(0.5, Math.min(1, windowWidth / 1100));

    customConfetti({
      particleCount: 1,
      gravity: 0.8,
      spread: 90,
      origin: { y: 0.6 },
      colors: [
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
      ],
      scalar: confettiScale
    });

    confettiAnimationId = window.requestAnimationFrame(confettiAnimation);
  };

  /** Function to stop the winning animation */
  const stopWinningAnimation = () => {
    if (confettiAnimationId) {
      window.cancelAnimationFrame(confettiAnimationId);
    }
    sunburstSvg.style.display = 'none';
  };

  /**  Function to be trigger before spinning */
  const onSpinStart = () => {
    stopWinningAnimation();
    drawButton.disabled = true;
    settingsButton.disabled = true;
    soundEffects.startSpinSound();
  };

  /**  Functions to be trigger after spinning */
  const onSpinEnd = async () => {
    soundEffects.stopSpinSound();

    confettiAnimation();
    sunburstSvg.style.display = 'block';
    await soundEffects.win();
    drawButton.disabled = false;
    settingsButton.disabled = false;
  };

  /** Slot instance */
  const slot = new Slot({
    reelContainerSelector: '#reel',
    maxReelItems: MAX_REEL_ITEMS,
    onSpinStart,
    onSpinEnd,
    onNameListChanged: stopWinningAnimation,
    nameList: [
      'Laura Phan',
      'Thomas Nguyen',
      'Dilys Nguyen',
      'Kaylin Hoang',
      'Dawn Phan',
      'Celine Dau',
      'Jessica Tran',
      'Benjamin Ho',
      'Summer Truong',
      'Happi Tran',
      'Darryl Ho',
      'Charles Do',
      'Alden Nguyen',
      'Tommy Huynh',
      'Doris Tran',
      'Elias Tran',
      'Nora Nguyen',
      'Wayne Hoang',
      'Calvin Tran',
      'Flora Dang',
      'Kinsley Nguyen',
      'Jenna Ho',
      'Nelly Phan',
      'Beverly Nguyen',
      'Hazel Nguyen',
      'Krystal Phan',
      'Oscar Tran',
      'Dominic Nguyen',
      'Jessie Nguyen',
      'Ivy Dang',
      'Joyce Tran',
      'Elena Le',
      'Morri Tran',
      'Richie Nguyen',
      'Primmy Nguyen',
      'Steven Le',
      'Hobert Nguyen',
      'Sarah Nguyen',
      'Oriana Nguyen',
      'Mernie Vo',
      'Jordan Le',
      'Maverick Le',
      'Cara Le',
      'Bin Dinh',
      'Bevis Nguyen',
      'Lucy Ta',
      'Annie Nguyen',
      'Karina Ho',
      'Nolan Nguyen',
      'Monika Tran',
      'Cici Ngo',
      'Amy Nguyen',
      'Keely Vo',
      'Holly Le',
      'Amber Tran',
      'June Ngo',
      'Heidi Nguyen',
      'Jerlyn Ha',
      'Suny Nguyen',
      'Serena Vo',
      'Nina Nguyen',
      'Hilary Tran',
      'Ann Pham',
      'Jesse Le',
      'Bright Phan',
      'Milos Ho',
      'Marik Nguyen',
      'Stewart Tran',
      'Sandra Nguyen',
      'Kimmy Huynh',
      'Riley Le',
      'Finn Dinh',
      'Conal Le',
      'Device Nguyen',
      'Augustus Le',
      'Curtis Nguyen',
      'Edwin Tran',
      'Grealish Tran',
      'Rory Phan',
      'Christian Phan',
      'Enzo Nguyen',
      'Davis Nguyen',
      'Neron Nguyen',
      'Thaddeus Dao',
      'Jena Hoang',
      'Derek Nguyen',
      'Shelby Thai',
      'Herry Ho',
      'Isolda Bui',
      'Bruno Dang',
      'Adrian Nguyen',
      'Hari Le',
      'Terry Le',
      'Dalziel Nguyen',
      'Artoria Tran',
      'Tristan Nguyen',
      'Tracie Nguyen',
      'Wendy Pham',
      'Paxton Pham',
      'Tiara Phan',
      'Lina Nguyen',
      'Samson Le',
      'Dash Luong',
      'Lewis Nguyen',
      'Paulo Vo',
      'Daido Ho',
      'Vania Nguyen',
      'Ritter Nguyen',
      'Kaiser Nguyen',
      'Manus Nguyen',
      'Eira Nguyen',
      'Miranda Le',
      'Zina Nguyen',
      'Vannie Nguyen',
      'Lando Kieu',
      'Xavia Do',
      'Latifah Tran',
      'Lionel Tran',
      'Dagny Y',
      'Caily Nguyen',
      'Celia Tran',
      'Ethen Nguyen',
      'Ellen Nguyen',
      'Artem Le',
      'Luana Nguyen',
      'Winn Tran',
      'Travis Le',
      'Gill Duong',
      'James Truong',
      'Radley Ho',
      'Maris Nguyen',
      'Donna Nguyen',
      'Taya Nguyen',
      'Palmer Trinh',
      'Jackie Dinh',
      'Franklin Le',
      'Pamela Phan',
      'Jolie Pham',
      'Lora Nguyen',
      'Packer Tra',
      'Tuffy Tran',
      'Leah Le',
      'Sona Ho',
      'Elmer La',
      'Juna Ho',
      'Gary Ha',
      'Alyx Pham',
      'Mei Vu',
      'Sophia Truong',
      'Taylor Ho',
      'Viktor Nguyen',
      'Abraham Nguyen',
      'Killian Le',
      'Addy Nguyen',
      'Violet Dang',
      'Mila Nguyen',
      'Catheryn Dang',
      'Sargon Hoang',
      'Hades Nguyen',
      'Arnold Nguyen',
      'Mina Bui',
      'Mindy Nguyen',
      'Jonas Nguyen',
      'Tavis Hoang',
      'Raven Le',
      'Levin Pham',
      'Viggo Nguyen',
      'Laurel Nguyen',
      'Marvin Vo',
      'Lev Bui',
      'Ophelia Tran',
      'Sana Hoang',
      'Michale Tran',
      'Blake Phan',
      'Enni Dang',
      'Hanie Truong',
      'Alano Nguyen',
      'Zach Tran',
      'Evan Nguyen',
      'Hercules Le',
      'Sunniva Nguyen',
      'Tom Doi',
      'Dani Le',
      'Clay Tran',
      'Bond Huynh',
      'Harvey Dang',
      'Kenzie Cao',
      'Venn Ton',
      'Gwen Hoang',
      'Ariel Doan',
      'Rico Dao',
      'Nika Nguyen',
      'Welt Huynh',
      'Ralph Pham',
      'Milo Le',
      'Hani Le',
      'Elyn Phan',
      'Roulet Nguyen',
      'Blair Tran',
      'Bailey Tran',
      'Kayn Le',
      'Milner Dang',
      'Crispin Tran',
      'Syaoran Nguyen',
      'Rice Le',
      'Caleb Nguyen',
      'Dawson Le',
      'Andrey Nguyen',
      'Jayden Nguyen',
      'Kaymid Dang',
      'Hydra Le',
      'Ross Nguyen',
      'Lythe Phan',
      'Amell Dong',
      'Tyson Nguyen',
      'Erling Ngo',
      'Jace Nguyen',
      'Kaden Nguyen',
      'Niko Le',
      'Theodore Luong',
      'Nicholas Le',
      'Nadia Tran',
      'Aina Ho',
      'Luca Ngo',
      'Amira Ngo',
      'Glee Hoang',
      'Astro Tran',
      'Mira Nguyen',
      'Billy Nguyen',
      'Hunter Tran',
      'Grey Dang',
      'Jamish Vo',
      'Tobias Ngo',
      'Tyler Phan',
      'Edmund Le',
      'Grainne Dong',
      'Melia Tran',
      'Jonah Nguyen',
      'Heisenberg Nguyen',
      'Cole Nguyen',
      'Winter Pham',
      'Esther Nguyen',
      'Gemma Nguyen',
      'Halen Hoang',
      'Jann Ngo',
      'Kaisa Le',
      'Kailey Le',
      'Nia Nguyen',
      'Ellyn Hoang',
      'Banner Ha',
      'Prox Tran',
      'Jubilant Nguyen',
      'Larissa Nguyen',
      'Aalia Tran',
      'Cherry Nguyen',
      'Kennedy Duong',
      'Andreas Nguyen',
      'Seamus Pham',
      'Zelda Le',
      'Savvy Nguyen',
      'Kylie Tran',
      'Debbie Le',
      'Dexter Pham',
      'Niam Nguyen',
      'Nicky Phan',
      'Albion Dang',
      'Carter Nguyen',
      'Danie Le',
      'Justine Pham',
      'Cindy Tran',
      'Diego Dao',
      'Tobey Le',
      'Luciana Tran',
      'Rosalie Nguyen',
      'Adora Hoang',
      'Martina Bui',
      'Lucia Ho',
      'Tia Doan',
      'Clarissa Tran',
      'Vanna Ngo',
      'Hardy Nguyen',
      'Frank Le',
      'Neli Pham',
      'Rex Nguyen',
      'Mihal Le',
      'Shay Nguyen',
      'Valerie Ho',
      'Kendrick Che',
      'Cynthia Duong',
      'Vicenta Tran',
      'Phineas Tran',
      'Karim Ho',
      'Carlos Vo',
      'Garvin Tran',
      'Jadon Le',
      'Foster Nguyen',
      'Titan Thai',
      'Kian Duong',
      'Karl Tran',
      'Sylvie Nguyen',
      'Lindo Nguyen',
      'Aveline Le',
      'Lira Nguyen',
      'Van Mai',
      'Vander Tran',
      'Kanye Tran',
      'Lila Truong',
      'Sylas Tran',
      'Pearl Nguyen',
      'Vito Doan',
      'Juvia Tran',
      'Axel Nguyen',
      'Johann Le',
      'Pyke Duong',
      'Garrick Ho',
      'Ashton Nguyen',
      'Jocelyn Tran',
      'Erin Vo',
      'Garick Tran',
      'Lena Le',
      'Heaven Nguyen',
      'Selene Nguyen',
      'Lillie Phan',
      'Celina Le',
      'Britney Dang',
      'Aurelia Nguyen',
      'Aeris Hoang',
      'Marwin Pham',
      'Henie Vo',
      'Sebastian Tran',
      'Tandy Le',
      'Capricorn Nguyen',
      'Brice Duong',
      'Kairo Huynh',
      'Zyron Nguyen',
      'Jaxon Pham',
      'Keon Nguyen',
      'Bernard Hoang',
      'Queenie Le',
      'Daphne Dinh',
      'Celeste Do',
      'Hilbert Nguyen',
      'Sandy Duong',
      'Fern Huynh',
      'Shaw Le',
      'Novian Nguyen',
      'Hayes Tran',
      'Elian Phung',
      'Maika Nguyen',
      'Thea Ho',
      'Lorenzo Ong',
      'Reina Luong',
      'Kash Nguyen',
      'Shawn Nguyen',
      'Ekko Huynh',
      'Dom Tran',
      'Braden Nguyen',
      'Daker Le',
      'Orion Luong',
      'Tyrone Mai',
      'Beck Tran',
      'Adela Truong',
      'Suri Nguyen',
      'Elina Nguyen',
      'Kallie Nguyen',
      'Tristin Truong',
      'Liora Tran',
      'Theon Pham',
      'Daiki Tieu',
      'Boris Truong',
      'Huon Pham',
      'Xavier Thai',
      'Julian Tran',
      'Jarvis Phan',
      'Prosper Nguyen',
      'Richy Duong',
      'Monie Tran',
      'Cyrus Lai',
      'Tobi Nguyen',
      'Solaya Hoang',
      'Madeline Tran',
      'Miles Nguyen',
      'Lucian Tran',
      'Elise Su',
      'Thalia Nguyen',
      'Matrix Truong',
      'Stellan Pham',
      'Ciro Le',
      'Mace Tran',
      'Hagan Tran',
      'Darcy Le',
      'Kyla Le',
      'Christina Nguyen',
      'Rachael Le',
      'Kacy Tran',
      'Parker Nguyen',
      'Jasten Nguyen',
      'Koben Nguyen',
      'Tillman Vu',
      'Kieran Nguyen',
      'Tate Tran',
      'Don Le',
      'Nor Nguyen',
      'Wren Tran',
      'Ewan Nguyen',
      'Elysa Le',
      'Jocasta Tran',
      'Domingo Ton',
      'Mateo Nguyen',
      'Meryl Nguyen',
      'Nova Nguyen',
      'Selin Nguyen',
      'Lona Vo',
      'Bernie Mai',
      'Golden Le',
      'Yvonne Le',
      'Lorient Nguyen',
      'Eddy Ngo',
      'Raina Truong',
      'Camille Duong',
      'Kace Ho',
      'Nyla Hoang',
      'Waylen Nguyen',
      'Reon Le',
      'Kaelyn Le',
      'Elsie Nguyen',
      'Abe Pham',
      'Amos Truong',
      'Astrid Nguyen',
      'Tanner Nguyen',
      'Minni Nguyen',
      'Sofie Le',
      'Jon Nguyen',
      'Elaine Nguyen',
      'Vic Nguyen',
      'Cecile Le',
      'Rhyme Nguyen',
      'Aries Cao',
      'Rafael Nguyen',
      'Emil To',
      'Marin Le',
      'Doran Tran',
      'Nadir Nguyen',
      'Caine Ho',
      'Karit Nguyen',
      'Evander Nguyen',
      'Hanson Doan',
      'Neva Le',
      'Lilian Nguyen',
      'Maelle Le',
      'Hanne Phan',
      'Draco Le',
      'Hulk Nguyen',
      'Biron Pham',
      'Cael Nguyen',
      'Bem Doan',
      'Floyd Nguyen',
      'Laurent Nguyen',
      'Hadrian Tran',
      'Colby Nguyen',
      'Rodney Do',
      'Wolfgang Ngo',
      'Sia Nguyen',
      'Vivia Mai',
      'Liana Vu',
      'Lumi Ly',
      'Morgan Tran',
      'Levana Le',
      'Barron Tran',
      'Jalen Bui',
      'Hywell Le',
      'Fabian Nguyen',
      'Tater Nguyen',
      'Martian Tran',
      'Luki Mai',
      'Jabril Vo',
      'Brook Duong',
      'Willy Tran',
      'Elior Nguyen',
      'Heimer Nguyen',
      'Miguel Nguyen',
      'Rynor Nguyen',
      'Dami Mai',
      'Anton Luong',
      'Clarisse Vo',
      'Avery Le',
      'Eria Nguyen',
      'Andex Do',
      'Erwin Nguyen',
      'Eian Hoang',
      'Wider Ngo',
      'Omni Nguyen',
      'Adonis Do',
      'Daemon Quach',
      'Kylan Tran',
      'Grant Vu',
      'Raid Nguyen',
      'Galen Nguyen',
      'Weston Le',
      'Asimov Nguyen',
      'Silvers Nguyen',
      'Kenn Tran',
      'Mahone Pham',
      'Taara Nguyen',
      'Aylin Nguyen',
      'Royce Huynh',
      'Denis Pham',
      'Flynn Do',
      'Phin Doan',
      'Lacey Le',
      'Garnett Duong',
      'Jaylen Le',
      'Deane Pham',
      'Vivienne Dang',
      'Rupert Le',
      'Twan Le',
      'Trina Ho'
    ]
  });

  /** To open the setting page */
  const onSettingsOpen = () => {
    nameListTextArea.value = slot.names.length ? slot.names.join('\n') : '';
    removeNameFromListCheckbox.checked = slot.shouldRemoveWinnerFromNameList;
    enableSoundCheckbox.checked = !soundEffects.mute;
    settingsWrapper.style.display = 'block';
  };

  /** To close the setting page */
  const onSettingsClose = () => {
    settingsContent.scrollTop = 0;
    settingsWrapper.style.display = 'none';
  };

  // Click handler for "Draw" button
  drawButton.addEventListener('click', () => {
    if (!slot.names.length) {
      onSettingsOpen();
      return;
    }

    slot.spin();
  });

  // Hide fullscreen button when it is not supported
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - for older browsers support
  if (!(document.documentElement.requestFullscreen && document.exitFullscreen)) {
    fullscreenButton.remove();
  }

  // Click handler for "Fullscreen" button
  fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      return;
    }

    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  });

  // Click handler for "Settings" button
  settingsButton.addEventListener('click', onSettingsOpen);

  // Click handler for "Save" button for setting page
  settingsSaveButton.addEventListener('click', () => {
    slot.names = nameListTextArea.value
      ? nameListTextArea.value
        .split(/\n/)
        .filter((name) => Boolean(name.trim()))
      : [];
    slot.shouldRemoveWinnerFromNameList = removeNameFromListCheckbox.checked;
    soundEffects.mute = !enableSoundCheckbox.checked;
    onSettingsClose();
  });

  // Click handler for "Discard and close" button for setting page
  settingsCloseButton.addEventListener('click', onSettingsClose);

  // Click handler for "Clear" button
  clearButton.addEventListener('click', () => {
    slot.clearWinner(() => {
      stopWinningAnimation();
    });
  });
})();

// Load sound effects
const soundEffects = new SoundEffects();
Promise.all([soundEffects.loadSpinAudio(), soundEffects.loadWinAudio()]).catch(
  console.error
);
