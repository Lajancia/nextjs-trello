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
                    sh 'docker build -t next14-trello .'
                }
            }
        
        }
         stage('Run Docker Image') {
            steps {
                script {
                    def myContainer = docker.image('next-trello').run('-d -p 3000:3000')
                }
            }
        }
   		// stage...
   	}
}