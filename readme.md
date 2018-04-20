Project demo video link -
https://youtu.be/8nqrYOmumXM

Project link - 
https://www.ecommerce.mithunjmistry.com

E-commerce application with PHP Laravel backend and React-Redux frontend: 

React files are present in resources/assets/js and SCSS files in resources/assets/sass

Instructions - 
1. Install npm, composer and yarn
2. Run "composer install"
3. Rename .env.example to .env
4. Generate the key with "php artisan key:generate"
5. Run "npm install"
6. Run "yarn run dev" to create necessary files.
7. Run "php artisan passport:install" and copy and paste the keys in .env file.
8. Configure MySQL database and provide connection details.
9. Run "php artisan migrate"
10. Run "php artisan serve"

Sample env is being provided in project.

For email - 
1. Create a free account on Mailgun and fill the mailgun API details in .env  file.

For cache - 
1. Host a Redis server and provide the details in .env or change the cache driver to "file"

For email validation - 
1. Sign up free on Verifalia and provide details in .env file to validate email.
 
The e-commerce site will be served. 
Custom SASS loader is configured in the webpack.

React is served via Laravel and fetches data by RESTful API calls made in Laravel.

Enjoy the react project with Laravel backend!