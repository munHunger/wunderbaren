pipeline {
    agent any
    stages {
        stage('build war') {
            agent {
                node {
                    docker { image 'gradle:latest' }   
                    customWorkspace '/root/.jenkins/workspace/Wunderbaren'
                }
            }
            steps {
                sh 'gradle war -b backend/build.gradle'
            }
        }
        stage('build dockerimage') {
            steps {
                script {
                    dir("/root/.jenkins/workspace/Wunderbaren/backend/") {
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