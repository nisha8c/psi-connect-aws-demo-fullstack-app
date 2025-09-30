// src/amplifyClient.ts
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

// Configure Amplify once at app start
Amplify.configure(outputs);
