<h2> Quality Assurance of Herat university System </h2>
<br />
<h3>How to run the application:</h3>
<p>1. clone the repository</p>
<p>2. then navigate to <code>qa-frontend</code> directory and run <code>yarn install --frozen-lockfile</code> to install the libraries which used in frontend. </p>
<p>3. create a file named <code>.env.local</code> and put this value <code>REACT_APP_API_URL=http://localhost:1111/api</code></p>
<p>4. run <code>yarn build</code> to build the react application to pure <code>HTML, CSS and JavaScript</code>.</p>
<p>5. Next navigate to <code>qa-backend</code> directory and run <code>yarn install --frozen-lockfile</code>  to install all libraries which used in backend.</p>
<p>6. create a file named <code>.env</code> and put all values which is in <code>.env.example</code> you should add the database connection configuration in <code>.env</code> file.</p>
<p>7. make sure you have run the MySQL server,finally run <code>yarn start</code> for production purpose or <code>yarn dev</code> for development purpose.</p>
<p>after starting the application will create necessary tables and you should see the below Log. </p>
<img src="https://user-images.githubusercontent.com/83835010/210947097-018fc964-83ed-4eae-90e5-6affb205590e.png" alt="loggerImage"/>
<p>Then from your browser go to localhost:1111 you will see the index page of the application.</p>
<img src="https://user-images.githubusercontent.com/83835010/210948079-01f57aa5-68ea-4502-9dc4-442c8fa7460b.png" alt="indexPage" />
