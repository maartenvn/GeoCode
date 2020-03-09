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
        sh 'cd dist'
        sh 'zip dev.zip -r .'
        sh 'rm -rf /home/groep29/frontend/development/*'
        sh 'mv dev.zip /home/groep29/frontend/development/dev.zip'
        sh 'cd /home/groep29/frontend/development/'
        sh 'unzip dev.zip'
        sh 'rm dev.zip'
      }
    }
    stage('Deploy - Production') {
      when {
        branch 'master'
      }
      steps {
        sh 'cd dist'
        sh 'zip prod.zip -r .'
        sh 'rm -rf /home/groep29/frontend/production/*'
        sh 'mv prod.zip /home/groep29/frontend/production/prod.zip'
        sh 'cd /home/groep29/frontend/production/'
        sh 'unzip prod.zip'
        sh 'rm prod.zip'
      }
    }
  }  
}
