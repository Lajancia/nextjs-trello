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

         stage('Run Docker Container') {
            steps {
                sh 'docker stop next-trello || true'
                sh 'docker rm next-trello || true'
                sh 'docker run --name next-trello --network my-network next14-trello'
            }
        }
   		// stage...
   	}
}