import React from 'react'
import Tone from 'tone'
import Keyboard from './Keyboard'
import './arp.css'

export default class Arp extends React.Component {

  // defaultState = {
  //   attackValue: 0.5,
  //   decayValue: 0.5,
  //   sustainValue: 0.5,
  //   releaseValue: 0.5,
  //   synth: {},
  //   frequency: 100,
  //   pattern: [],
  //   tone: ''
  // }

  constructor() {
    super()
    this.state = 
    {
      attackValue: 0.5,
      decayValue: 0.5,
      sustainValue: 0.5,
      releaseValue: 0.5,
      frequency: 100,
      isPlaying: true,
      synth: {},
      waveType: "sine",
      tone: {},
      pattern: [],
      patternType: "up",
      notes: [],
      index: 0,
    }
  }

  
  newSynth = () => {

    var synth = new Tone.MonoSynth(
      {
      "harmonicity": 3 ,
      "modulationIndex": 10,
      // "frequency": 'C4',
      "detune": 0,
			"oscillator" : {
        "type" : this.state.waveType
			},
			"envelope" : {
        "attack" : this.state.attackValue,
				"decay" : this.state.decayValue,
				"sustain" : this.state.sustainValue,
				"release" : this.state.releaseValue,
			},
			"filterEnvelope" : {
        "attack" : 0.3,
				"decay" : 0.7,
				"sustain" : 0.1,
				"release" : 0.80,
				"baseFrequency" : 300,
				"octaves" : 4
			}
    }).toMaster()


    const now = Tone.now()
    var pattern = new Tone.Pattern(function(time, note){
      synth.triggerAttackRelease(note);
    }, this.state.pattern, this.state.patternType)
    Tone.Transport.start("+0.2")
    pattern.start(0.2)
    // Tone.context.latencyHint = 'playback'
    this.setState({ synth: synth, tone: Tone })
    
  }
  
  stopSynth = () => {
    this.state.tone.Transport.stop()
    // this.state.synth.cle()
    this.setState({ synth: this.state.synth })
    // debugger
    // this.state.synth.dispose()
  }

  clearPattern = () => {
    this.setState({ pattern: [] })
  }

  makeKeyboard  = () => {
    return <div className="keyboard-container">
      <div className="note-div" onClick={this.handleChange}>C3</div>
      <div className="note-div" onClick={this.handleChange}>D3</div>
      <div className="note-div" onClick={this.handleChange}>E3</div>
      <div className="note-div" onClick={this.handleChange}>F3</div>
      <div className="note-div" onClick={this.handleChange}>G3</div>
      <div className="note-div" onClick={this.handleChange}>A3</div>
      <div className="note-div" onClick={this.handleChange}>B3</div>
      <div className="note-div" onClick={this.handleChange}>C4</div>
      <div className="note-div" onClick={this.handleChange}>D4</div>
      <div className="note-div" onClick={this.handleChange}>E4</div>
      <div className="note-div" onClick={this.handleChange}>F4</div>
      <div className="note-div" onClick={this.handleChange}>G4</div>
      <div className="note-div" onClick={this.handleChange}>A4</div>
      <div className="note-div" onClick={this.handleChange}>B4</div>
      <div className="note-div" onClick={this.handleChange}>C5</div>
    </div>
  }

  handleChange = (event) => {
    event.persist()
    this.setState((prevState) => {
      return { pattern: [...prevState.pattern, event.target.textContent] }    
    })
  }

  frequencyValue = () => {
    return <div className="freq-container">
    <p className="parameter-text">Pitch</p>
      <input 
        className="slider"
        id="freq-slider" 
        type="range" 
        min="50" max="200" 
        value={this.state.frequency} 
        onChange={this.handleFreqSliderChange}
        step="1"/>
    </div>
  }
  
  handleFreqSliderChange = (event) => {
    this.setState({ frequency: event.target.value })
  }

  patternType = () => {
    return <div className="pattern-container">
    <p>Pattern-Type</p>
      <form onSubmit={this.handleSubmit}>
        <select className="menu-select"value={this.state.value} onChange={this.handlepatternChange}>
          <option value="up">Up</option>
          <option value="down">Down</option>
          <option value="upDown">Up-Down</option>
          <option value="downUp">Down-Up</option>
          <option value="random">Random</option>
        </select>
      </form>
    </div>
  }

  handlePatternChange = (event) => {
    this.setState({ PatternType: event.target.value})
  }

  
  waveType = () => {
    return <div className="wave-container">
    <p>Wave-Type</p>
      <form onSubmit={this.handleSubmit}>
        <select className="menu-select" value={this.state.value} onChange={this.handleWaveChange}>
          <option value="sine">Sine</option>
          <option value="square">Square</option>
          <option value="triangle">Triangle</option>
          <option value="sawtooth">SawTooth</option>
        </select>
      </form>
    </div>
  }
  
  handleWaveChange = (event) => {
    this.setState({ waveType: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  adsrValues = () => {
   return <div className="adsr-container">
      <div className="slider-container">
        <p className="parameter-text">Attack</p>
        <input
        className="slider" 
        id="attack-slider" 
        type="range" 
        min="0" max="1" 
        value={this.state.attackValue} 
        onChange={this.handleAttackSliderChange}
        step="0.01"/>
      </div>
      <div className="slider-container">
        <p className="parameter-text">Decay</p>
        <input
        className="slider" 
        id="decay-slider" 
        type="range" 
        min="0" max="1" 
        value={this.state.decayValue} 
        onChange={this.handleDecaySliderChange}
        step="0.01"/>
      </div>
      <div className="slider-container">
        <p className="parameter-text">Sustain</p>
        <input
        className="slider" 
        id="sustain-slider" 
        type="range" 
        min="0" max="1" 
        value={this.state.sustainValue} 
        onChange={this.handleSustainSliderChange}
        step="0.01"/>
      </div>
      <div className="slider-container">
        <p className="parameter-text">Release</p>
        <input
        className="slider" 
        id="release-slider" 
        type="range" 
        min="0" max="1" 
        value={this.state.releaseValue} 
        onChange={this.handleReleaseSliderChange}
        step="0.01"/>
      </div>
    </div>
  }

  handleAttackSliderChange = (event) => {
    this.setState({ attackValue: event.target.value })
  }
  
  handleDecaySliderChange = (event) => {
    this.setState({ decayValue: event.target.value })
  }

  handleSustainSliderChange = (event) => {
    this.setState({ sustainValue: event.target.value })
  }

  handleReleaseSliderChange = (event) => {
    console.log(event.target.value)
    this.setState({ releaseValue: event.target.value })
  }



  render() {
    return <div className="arp-container">
      <div className="type-container">
        <this.patternType />
        <this.waveType />
      </div>
      <this.makeKeyboard />
      <p className="pattern-display">Pattern:{this.state.pattern}</p>
      <div className="button-container">
        <button className="buttons" onClick={this.newSynth}>Play</button>
        <button className="buttons" onClick={this.clearPattern}>Clear</button>
        <button className="buttons" onClick={this.stopSynth}>Stop</button>
      </div>
    </div>
  }
}