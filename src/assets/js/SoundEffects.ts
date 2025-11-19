export default class SoundEffects {
  private audioContext?: AudioContext;

  private gainNode?: GainNode;

  private buffer?: AudioBuffer | null = null;

  private source?: AudioBufferSourceNode | null = null;

  private isMuted = false;

  private SPIN_SOUND_URL = 'https://hau2.github.io/sounds/nhac-xo-so.mp3';

  constructor(isMuted = false) {
    this.isMuted = isMuted;

    if (window.AudioContext || window.webkitAudioContext) {
      this.audioContext = new (window.AudioContext
        || window.webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 1;
    }
  }

  set mute(muted: boolean) {
    this.isMuted = muted;

    if (muted) this.stopSpinSound(true);
  }

  get mute() {
    return this.isMuted;
  }

  /** Load file only once */
  private async loadSpinAudio() {
    if (!this.audioContext) return;
    if (this.buffer) return;

    const resp = await fetch(this.SPIN_SOUND_URL);
    const arrayBuffer = await resp.arrayBuffer();
    this.buffer = await this.audioContext.decodeAudioData(arrayBuffer);
  }

  /** Play spinning loop */
  public async startSpinSound() {
    if (this.isMuted) return;
    if (!this.audioContext || !this.gainNode) return;

    await this.loadSpinAudio();

    // nếu source cũ còn chạy thì tắt trước
    if (this.source) this.stopSpinSound(true);

    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer!;
    this.source.loop = true;
    this.source.connect(this.gainNode);
    this.source.start(0);

    // fade-in mượt (0 → 1 trong 0.3s)
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.gainNode.gain.linearRampToValueAtTime(
      1,
      this.audioContext.currentTime + 0.3
    );
  }

  /** Fade-out và tắt */
  public stopSpinSound(immediate = false) {
    if (!this.audioContext || !this.gainNode || !this.source) return;

    if (immediate) {
      try {
        this.source.stop();
      } catch {
        // do nothing
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
      try {
        this.source?.stop();
      } catch {
        // do nothing
      }
      this.source = null;
    }, fadeTime * 1000);
  }

  /** Giữ nguyên win sound của bạn nếu cần */
  // eslint-disable-next-line class-methods-use-this
  public async win(): Promise<boolean> {
    return true;
  }
}
