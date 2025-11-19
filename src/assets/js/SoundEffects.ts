export default class SoundEffects {
  private audioContext?: AudioContext;

  private gainNode?: GainNode;

  private buffer?: AudioBuffer | null = null; // spin buffer

  private source?: AudioBufferSourceNode | null = null;

  private winBuffer?: AudioBuffer | null = null; // win buffer

  private winSource?: AudioBufferSourceNode | null = null;

  private isMuted = false;

  private SPIN_SOUND_URL = 'https://hau2.github.io/sounds/nhac-xo-so.mp3';

  private WIN_SOUND_URL = 'https://hau2.github.io/sounds/yee.mp3';

  constructor(isMuted = false) {
    this.isMuted = isMuted;

    if (window.AudioContext || window.webkitAudioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 1;
    }
  }

  set mute(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopSpinSound(true);
      this.stopWinSound();
    }
  }

  get mute() {
    return this.isMuted;
  }

  /** Load spin sound */
  private async loadSpinAudio() {
    if (!this.audioContext) return;
    if (this.buffer) return;

    const resp = await fetch(this.SPIN_SOUND_URL);
    const arrayBuffer = await resp.arrayBuffer();
    this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
  }

  /** Load win sound */
  private async loadWinAudio() {
    if (!this.audioContext) return;
    if (this.winBuffer) return;

    const resp = await fetch(this.WIN_SOUND_URL);
    const arrayBuffer = await resp.arrayBuffer();
    this.winBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
  }

  /** Play spinning loop */
  public async startSpinSound() {
    if (this.isMuted) return;
    if (!this.audioContext || !this.gainNode) return;

    await this.loadSpinAudio();

    // tắt win trước khi quay
    this.stopWinSound();

    if (this.source) this.stopSpinSound(true);

    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer!;
    this.source.loop = true;
    this.source.connect(this.gainNode);
    this.source.start(0);

    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.3);
  }

  /** Fade-out spin */
  public stopSpinSound(immediate = false) {
    if (!this.audioContext || !this.gainNode || !this.source) return;

    if (immediate) {
      try { this.source.stop(); } catch {
        // ignore error
      }
      this.source = null;
      return;
    }

    const fadeTime = 0.6;

    this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
    this.gainNode.gain.setValueAtTime(
      this.gainNode.gain.value,
      this.audioContext.currentTime
    );
    this.gainNode.gain.linearRampToValueAtTime(
      0,
      this.audioContext.currentTime + fadeTime
    );

    setTimeout(() => {
      try { this.source?.stop(); } catch {
        // ignore error
      }
      this.source = null;
    }, fadeTime * 1000);
  }

  /** Play win sound */
  public async playWinSound() {
    if (this.isMuted) return;
    if (!this.audioContext) return;

    await this.loadWinAudio();

    // nếu win đang phát thì tắt
    if (this.winSource) this.stopWinSound();

    this.winSource = this.audioContext.createBufferSource();
    this.winSource.buffer = this.winBuffer!;
    this.winSource.loop = false;
    this.winSource.connect(this.audioContext.destination);
    this.winSource.start(0);
  }

  /** Stop win sound */
  public stopWinSound() {
    if (!this.winSource) return;

    try {
      this.winSource.stop();
    } catch {
      // ignore error
    }
    this.winSource = null;
  }

  /** API được app.ts gọi */
  public async win(): Promise<boolean> {
    await this.playWinSound();
    return true;
  }
}
