pipeline {
    agent any
    stages {
        stage('build war') {
            agent {
                docker { 
                    image 'gradle:latest'
                    reuseNode true
                }
            }
            steps {
                sh 'gradle war -b backend/build.gradle'
            }
        }
        stage('build backend dockerimage') {
            steps {
                script {
                    dir("backend/") {
                        def image = docker.build("munhunger/wunderbaren-backend")
                        
                        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                            image.push("${env.BUILD_NUMBER}")
                            image.push("latest")
                        }
                    }
                }
            }
        }
        stage('build frontend dockerimage') {
            steps {
                script {
                    dir("frontend/wunderbaren/") {
                        def image = docker.build("munhunger/wunderbaren-frontend")
                        
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