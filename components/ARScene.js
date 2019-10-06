'use strict';

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroScene,
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      note_visible: false,
      bottle_visible: true,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onBottleClick = this._onBottleClick.bind(this);
    this._onNoteClick = this._onNoteClick.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0,-1,-.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
        <Viro3DObject
          source={require('./../res/bottle/bottle.obj')}
          resources={[require('./../res/bottle/bottle.mtl')]}
          position={[0, -0.07, -0.52]}          
          scale={[.005, .005, .005]}
          rotation={[-96, 0, 0]}
          animation={{name: "rotate", run: true, loop: true}}
          materials={["bottle"]}
          type="OBJ"
          onClick={this._onBottleClick}
          visible={this.state.bottle_visible}
        />
        <Viro3DObject
          source={require('./../res/tv/tv.obj')}
          position={[0, 0.2, -0.65]}
          scale={[.012, .012, .012]}
          materials={["tv"]}
          type="OBJ"
        />
        <Viro3DObject
          source={require('./../res/note/note.obj')}
          resources={[require('./../res/note/note.mtl')]}
          position={[0, -0.01, -0.52]}
          scale={[.00045, .00045, .00045]}
          rotation={[0, 0, 0]}
          type="OBJ"
          onClick={this._onNoteClick}
          visible={this.state.note_visible}
        />
      </ViroARScene>
    );
  }

  _onBottleClick() {
    this.setState({
      bottle_visible: false,
      note_visible: true
    });
  }

  _onNoteClick() {
    this.setState({
      note_visible: false,
      bottle_visible: true
    });
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

ViroMaterials.createMaterials({
  bottle: {
    diffuseTexture: require('./../res/bottle/bottle.jpg'),
  },
  tv: {
    diffuseTexture: require('./../res/tv/tv.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "-=90"
    },
    duration: 300, //.25 seconds
  },
});

module.exports = HelloWorldSceneAR;