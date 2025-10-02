'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

// Configure immediately at module load (no useEffect)
Amplify.configure(outputs);
