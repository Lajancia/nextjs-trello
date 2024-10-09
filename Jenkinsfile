pipeline {
    agent any
    
    stages() {
        
    stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: 'main']], 
                                userRemoteConfigs: [[url: 'https://github.com/Lajancia/nextjs-trello.git']])
            }
        }
    stage('Test') {
    steps {
        echo 'Testing..'
    }
}
        
   		// stage...
   	}
}