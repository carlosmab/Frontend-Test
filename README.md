# test-frontend


The test was developed using: 
- Vuejs 3
- Firebase 9


## 1. Setup

    > git clone https://github.com/carlosmab/frontend-test.git
    > npm install
    > npm run dev


## 2. Folder Structure

- src   
    - assets: 
        - images
        - main.css
    - components: 
        - VotingCardComponent: \
            _Component to display every Person and posting votes_
    - config: 
        - firebase.config.js: \
            _Firebase configuration object_ 
    - services: 
        - firebase.service.js: \
            _Service to connect with firebase_  
    - models: 
        - famous-people.model.js: \
            _Methods to get data and update documents_
    - App.vue: \
        _Main component_
    - main.js: 
        _Creating vue instance_ 

## 3. Special modules:
- **firebase:** _Persistent data store_
- **moment.js:** _Relative time_

## Thanks!

By: Carlos Mario Araujo Berrocal