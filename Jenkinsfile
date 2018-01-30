pipeline {
    agent any
    stages {
        stage('build war') {
            agent {
                docker { image 'gradle:latest' }
            }
            steps {
                sh 'gradle war'
            }
        }
        stage('build dockerimage') {
            steps {
                script {
                    dir('./') {
                        ls build
                        def image = docker.build("munhunger/wunderbaren")
                        
                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            image.push("${env.BUILD_NUMBER}")
                            image.push("latest")
                        }
                    }
                }
            }
        }
    }
}