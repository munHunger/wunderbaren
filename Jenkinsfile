pipeline {
    agent any
    stages {
        stage('build war') {
            agent {
                docker { image 'gradle:latest' }
            }
            steps {
                sh 'gradle war -b backend/build.gradle'
            }
        }
        stage('build dockerimage') {
            steps {
                script {
                    dir('backend/') {
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