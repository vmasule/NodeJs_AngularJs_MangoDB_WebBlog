<!--Common or uitility code goes here -->

 $(document).ready(function() {

 		/**Navigation link click events **/
 	  <!--New psot link click event -->
      $('#createNewPost').click(function(e) {
        e.preventDefault();
        createAndSubmitDynamicForm("newPost", "", "GET", false);
        // $('#homePage').removeClass('active');
        // $('#createNewPost').addClass('active');
      });

 	  <!--Home page link click event -->
      $('#homePage').click(function(e) {
        e.preventDefault();
        createAndSubmitDynamicForm("/viewPosts", "", "GET", false);
        // $('#homePage').addClass('active');
      });      
  });

 function createAndSubmitDynamicForm(path, params, method, isOpenRequestInNewTab) {
    method = method || "POST"; 
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    if(isOpenRequestInNewTab != "" && isOpenRequestInNewTab){
      form.setAttribute("target", "_blank");
    }

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
          for(var prop in params[key]){
                 
          	if(params[key].hasOwnProperty(prop)){
          	var hiddenField = document.createElement("input");
          	hiddenField.setAttribute("type", "hidden");
          	hiddenField.setAttribute("name", prop);
          	hiddenField.setAttribute("id", prop);
          	hiddenField.setAttribute("value", params[key][prop]);
          	form.appendChild(hiddenField);         
        }
      }
      
    }
    }
    document.body.appendChild(form);
    form.submit();
}