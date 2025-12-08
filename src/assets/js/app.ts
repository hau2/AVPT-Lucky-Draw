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
      'Sandra Nguyen',
      'Isolda Bui',
      'Kaiser Nguyen',
      'Lewis Nguyen',
      'Dash Luong',
      'Samson Le',
      'Artoria Tran',
      'Christian Phan',
      'Rory Phan',
      'Edwin Tran',
      'Device Nguyen',
      'Jesse Le',
      'Bright Phan',
      'Calvin Tran',
      'Wayne Hoang',
      'Hari Le',
      'Bruno Dang',
      'Caily Nguyen',
      'Luana Nguyen',
      'Ellen Nguyen',
      'Ethen Nguyen',
      'Hilary Tran',
      'Morri Tran',
      'Nina Nguyen',
      'Leah Le',
      'Juna Ho',
      'Tuffy Tran',
      'Primmy Nguyen',
      'Wendy Pham',
      'Holly Le',
      'Richie Nguyen',
      'Amy Nguyen',
      'Hazel Nguyen',
      'Beverly Nguyen',
      'Krystal Phan',
      'Elias Tran',
      'Nelly Phan',
      'Cici Ngo',
      'Pamela Phan',
      'Arnold Nguyen',
      'Tristan Nguyen',
      'Darryl Ho',
      'Doris Tran',
      'Dagny Y',
      'Latifah Tran',
      'Enzo Nguyen',
      'Adrian Nguyen',
      'Davis Nguyen',
      'Jackie Dinh',
      'Karina Ho',
      'Viktor Nguyen',
      'Hades Nguyen',
      'Sana Hoang',
      'Enni Dang',
      'Artem Le',
      'Paulo Vo',
      'Celia Tran',
      'Jerlyn Ha',
      'Suny Nguyen',
      'Hobert Nguyen',
      'Tommy Huynh',
      'Steven Le',
      'Alden Nguyen',
      'Zina Nguyen',
      'Vannie Nguyen',
      'Jena Hoang',
      'Terry Le',
      'Derek Nguyen',
      'Dalziel Nguyen',
      'Amber Tran',
      'Nora Nguyen',
      'June Ngo',
      'Oscar Tran',
      'Gary Ha',
      'Benjamin Ho',
      'Cara Le',
      'Celine Dau',
      'Happi Tran',
      'Dawn Phan',
      'Jenna Ho',
      'Flora Dang',
      'Kaylin Hoang',
      'Summer Truong',
      'Kinsley Nguyen',
      'Sarah Nguyen',
      'Dilys Nguyen',
      'Paxton Pham',
      'Jessie Nguyen',
      'Lucy Ta',
      'Bevis Nguyen',
      'Sona Ho',
      'Lora Nguyen',
      'Jordan Le',
      'Mila Nguyen',
      'Ophelia Tran',
      'Hanie Truong',
      'Jonas Nguyen',
      'Miranda Le',
      'Joyce Tran',
      'Oriana Nguyen',
      'Ivy Dang',
      'Ann Pham',
      'Thomas Nguyen',
      'Tiara Phan',
      'Lina Nguyen',
      'Mernie Vo',
      'Serena Vo',
      'Monika Tran',
      'Elena Le',
      'Grealish Tran',
      'Charles Do',
      'Curtis Nguyen',
      'Thaddeus Dao',
      'Dominic Nguyen',
      'Finn Dinh',
      'Bin Dinh',
      'Maverick Le',
      'Travis Le',
      'Stewart Tran',
      'Riley Le',
      'Conal Le',
      'Marik Nguyen',
      'Donna Nguyen',
      'Taya Nguyen',
      'Vania Nguyen',
      'Xavia Do',
      'Alyx Pham',
      'Mei Vu',
      'Tracie Nguyen',
      'Mina Bui',
      'Nolan Nguyen',
      'Shelby Thai',
      'Herry Ho',
      'Manus Nguyen',
      'Arsen Le',
      'Jolie Pham',
      'Elmer La',
      'Mindy Nguyen',
      'Blair Tran',
      'Ritter Nguyen',
      'Lando Kieu',
      'Gill Duong',
      'Radley Ho',
      'Franklin Le',
      'Addy Nguyen',
      'Abraham Nguyen',
      'Augustus Le',
      'Neron Nguyen',
      'Palmer Trinh',
      'Winn Tran',
      'Lionel Tran',
      'Daido Ho',
      'Maris Nguyen',
      'Sargon Hoang',
      'Packer Tra',
      'Hani Le',
      'Jayce Nguyen',
      'Tavis Hoang',
      'Raven Le',
      'Levin Pham',
      'Viggo Nguyen',
      'Laurel Nguyen',
      'Lev Bui',
      'Blake Phan',
      'Zach Tran',
      'Evan Nguyen',
      'Sunniva Nguyen',
      'Dani Le',
      'Bond Huynh',
      'Kenzie Cao',
      'Gwen Hoang',
      'Welt Huynh',
      'Ralph Pham',
      'Milo Le',
      'Bailey Tran',
      'Rice Le',
      'Dawson Le',
      'Andrey Nguyen',
      'Kaymid Dang',
      'Theodore Luong',
      'Ross Nguyen',
      'Amell Dong',
      'Erling Ngo',
      'Hydra Le',
      'Jace Nguyen',
      'Lythe Phan',
      'Niko Le',
      'Nicholas Le',
      'Nadia Tran',
      'Aina Ho',
      'Luca Ngo',
      'Amira Ngo',
      'Grey Dang',
      'Glee Hoang',
      'Astro Tran',
      'Mira Nguyen',
      'Tyler Phan',
      'Tobias Ngo',
      'Edmund Le',
      'Grainne Dong',
      'Melia Tran',
      'Kaisa Le',
      'Kailey Le',
      'Ellyn Hoang',
      'Jann Ngo',
      'Nia Nguyen',
      'Halen Hoang',
      'Eira Nguyen',
      'Catheryn Dang',
      'Violet Dang',
      'Sophia Truong',
      'Taylor Ho',
      'Elyn Phan',
      'Roulet Nguyen',
      'Esther Nguyen',
      'Gemma Nguyen',
      'Milos Ho',
      'James Truong',
      'Killian Le',
      'Alano Nguyen',
      'Michale Tran',
      'Marvin Vo',
      'Nika Nguyen',
      'Clay Tran',
      'Rico Dao',
      'Harvey Dang',
      'Venn Ton',
      'Tom Doi',
      'Ariel Doan',
      'Hercules Le',
      'Kayn Le',
      'Milner Dang',
      'Crispin Tran',
      'Syaoran Nguyen',
      'Jayden Nguyen',
      'Tyson Nguyen',
      'Kaden Nguyen',
      'Billy Nguyen',
      'Hunter Tran',
      'Jamish Vo',
      'Jonah Nguyen',
      'Heisenberg Nguyen',
      'Cole Nguyen',
      'Winter Pham',
      'Caleb Nguyen',
      'Larissa Nguyen',
      'Aalia Tran',
      'Cherry Nguyen',
      'Banner Ha',
      'Prox Tran',
      'Jubilant Nguyen',
      'Kennedy Duong',
      'Kylie Tran',
      'Savvy Nguyen',
      'Andreas Nguyen',
      'Seamus Pham',
      'Zelda Le',
      'Debbie Le',
      'Dexter Pham',
      'Cindy Tran',
      'Justine Pham',
      'Carter Nguyen',
      'Danie Le',
      'Nicky Phan',
      'Niam Nguyen',
      'Albion Dang',
      'Diego Dao',
      'Rosalie Nguyen',
      'Adora Hoang',
      'Lucia Ho',
      'Clarissa Tran',
      'Frank Le',
      'Luciana Tran',
      'Tia Doan',
      'Tobey Le',
      'Martina Bui',
      'Vanna Ngo',
      'Hardy Nguyen',
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
      'Jessica Tran',
      'Titan Thai',
      'Kian Duong',
      'Laura Phan',
      'Karl Tran',
      'Sylvie Nguyen',
      'Lindo Nguyen',
      'Aveline Le',
      'Lira Nguyen',
      'Pearl Nguyen',
      'Vito Doan',
      'Juvia Tran',
      'Axel Nguyen',
      'Van Mai',
      'Vander Tran',
      'Kanye Tran',
      'Lila Truong',
      'Sylas Tran',
      'Annie Nguyen',
      'Pyke Duong',
      'Johann Le',
      'Ashton Nguyen',
      'Erin Vo',
      'Garrick Ho',
      'Celina Le',
      'Lena Le',
      'Lillie Phan',
      'Heaven Nguyen',
      'Britney Dang',
      'Selene Nguyen',
      'Jocelyn Tran',
      'Garick Tran',
      'Marwin Pham',
      'Aurelia Nguyen',
      'Aeris Hoang',
      'Henie Vo',
      'Sebastian Tran',
      'Tandy Le',
      'Brice Duong',
      'Kairo Huynh',
      'Keon Nguyen',
      'Capricorn Nguyen',
      'Zyron Nguyen',
      'Jaxon Pham',
      'Bernard Hoang',
      'Queenie Le',
      'Daphne Dinh',
      'Celeste Do',
      'Hilbert Nguyen',
      'Sandy Duong',
      'Fern Huynh',
      'Elian Phung',
      'Thea Ho',
      'Maika Nguyen',
      'Lorenzo Ong',
      'Kash Nguyen',
      'Reina Luong',
      'Shaw Le',
      'Novian Nguyen',
      'Hayes Tran',
      'Shawn Nguyen',
      'Ekko Huynh',
      'Adela Truong',
      'Elina Nguyen',
      'Suri Nguyen',
      'Dom Tran',
      'Orion Luong',
      'Daker Le',
      'Beck Tran',
      'Tyrone Mai',
      'Braden Nguyen',
      'Tristin Truong',
      'Casper Phi',
      'Liora Tran',
      'Theon Pham',
      'Kallie Nguyen',
      'Boris Truong',
      'Richy Duong',
      'Daiki Tieu',
      'Huon Pham',
      'Jarvis Phan',
      'Prosper Nguyen',
      'Xavier Thai',
      'Julian Tran',
      'Lyly Vu',
      'Tobi Nguyen',
      'Cyrus Lai',
      'Monie Tran',
      'Solaya Hoang',
      'Keely Vo',
      'Matrix Truong',
      'Stellan Pham',
      'Ciro Le',
      'Mace Tran',
      'Tiella Tran',
      'Madeline Tran',
      'Miles Nguyen',
      'Lucian Tran',
      'Elise Su',
      'Thalia Nguyen',
      'Hagan Tran',
      'Jasten Nguyen',
      'Koben Nguyen',
      'Tillman Vu',
      'Kieran Nguyen',
      'Tate Tran',
      'Don Le',
      'Nor Nguyen',
      'Darcy Le',
      'Kyla Le',
      'Christina Nguyen',
      'Rachael Le',
      'Kacy Tran',
      'Parker Nguyen',
      'Ewan Nguyen',
      'Elysa Le',
      'Jocasta Tran',
      'Domingo Ton',
      'Mateo Nguyen',
      'Wren Tran',
      'Meryl Nguyen',
      'Nova Nguyen',
      'Gigi Dao',
      'Selin Nguyen',
      'Lona Vo',
      'Heidi Nguyen',
      'Kimmy Huynh',
      'Golden Le',
      'Yvonne Le',
      'Lorient Nguyen',
      'Eddy Ngo',
      'Bernie Mai',
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
      'Hamish Nguyen',
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
    slot.clearWinner();
  });
})();

// Load sound effects
const soundEffects = new SoundEffects();
Promise.all([
  soundEffects.loadSpinAudio(),
  soundEffects.loadWinAudio()
]).catch(console.error);
