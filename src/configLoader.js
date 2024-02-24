import localConfig from './config.local'
import developConfig from './config.develop'
import releaseConfig from './config'

let config;

switch(process.env.REACT_APP_ENV){
    case 'local':
        config = localConfig;
        break;
    case 'develop':
        config = developConfig;
        break;
    case 'release':
        config = releaseConfig;
        break;
    default:
        config = localConfig;
}

export default config;