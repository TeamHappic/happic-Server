import mongoose from 'mongoose';

export interface CharacterInfo {
  name: String;
  image: String[];
  talk: CharacterTalkInfo[];
  createPost: String;
  push: String[];
  levelNmaes: String[];
}

export interface CharacterTalkInfo {
  question: String;
  answer: String;
}

//test
