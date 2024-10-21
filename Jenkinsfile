pipeline {
    agent any
    
    stages() {
        
        stage('Checkout') {
                steps {
                    checkout scmGit(branches: [[name: 'main']], 
                                    userRemoteConfigs: [[url: 'https://github.com/Lajancia/nextjs-trello.git']])
                }
            }
        stage('Docker Image Build') {
            steps {
                echo 'Docker building..'
                script {
                    sh 'docker build -t Next14-trello .'
                }
            }
        
        }
        
   		// stage...
   	}
}