pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Build - Normal') {
      when {
        not {
          branch 'master'
        }
      }
      steps {
        sh 'yarn build --mode development'
      }
    }
    stage('Build - Production') {
      when {
        branch 'master'
      }
      steps {
        sh 'yarn build --mode production'
      }
    }
    stage('Deploy - Development') {
      when {
        branch 'development'
      }
      steps {
        sh 'cd dist && zip dev.zip -r .'
        sh 'rm -rf /home/groep29/frontend/development/*'
        sh 'cd dist && mv dev.zip /home/groep29/frontend/development/dev.zip'
        sh 'cd /home/groep29/frontend/development/ && unzip dev.zip && rm dev.zip'
      }
    }
    stage('Deploy - Production') {
      when {
        branch 'master'
      }
      steps {
        sh 'cd dist && zip prod.zip -r .'
        sh 'rm -rf /home/groep29/frontend/production/*'
        sh 'cd dist && mv prod.zip /home/groep29/frontend/production/prod.zip'
        sh 'cd /home/groep29/frontend/production/ && unzip prod.zip && rm prod.zip'
      }
    }
  }  
}
