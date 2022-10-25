function loginLoading() {
   let alert = document.getElementById('alert-login')
   alert.style.display = "block"
}

function closeAlert() {
   let btn = document.getElementById('close-alert');
   let modal = document.getElementsByClassName('alert-info')[0];
   btn.addEventListener('click', () => {
      modal.style.display = 'none'
   })
}

function showModal() {
   let modal = document.getElementsByClassName('modal')[0]
   modal.style.display = 'block'
}
function showEditModal(id, nom, prenom, role, email, password) {
   showModal();
   let title = document.getElementsByClassName('modal-title')[0]
   let form = document.getElementById('modal-form');
   let field_nom = document.getElementById('modal-nom');
   let field_prenom = document.getElementById('modal-prenom');
   let field_role = document.getElementById('modal-role');
   let field_email = document.getElementById('modal-email');
   let field_password = document.getElementById('modal-password');
   let password_group = document.getElementById('password-group');
   let field_id = document.getElementById('modal-id');
   password_group.style.display = 'none'
   field_password.value = password;
   field_nom.value = nom;
   field_id.value = id;
   field_prenom.value = prenom;
   field_role.value = role;
   field_email.value = email;
   title.innerHTML = 'Modifier un utilisateur';
   form.setAttribute('action', `/users/edit/${id}`)
}   

function closeModal() {
   let modal = document.getElementsByClassName('modal')[0]
   modal.style.display = 'none';

}

function generatePassword() {
   let field = document.getElementById("modal-password");
   let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let passwordLength = 12;
   let password = "";
   for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
   }
   field.value = password;
}

function resetPassword() {
   let field = document.getElementById("reset-password");
   let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   let passwordLength = 12;
   let password = "";
   for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
   }
   field.value = password;
}

function showResetModal(id, nom, prenom, role, email) {
   let modal = document.getElementsByClassName('reset-modal')[0]
   let form = document.getElementById('reset-form');
   let title = document.getElementById('reset-title');
   title.innerHTML = `${nom} ${prenom}`
   form.setAttribute('action', `/users/resetPassword/${id}`)
   modal.style.display = 'block';
   resetPassword();
   let field_nom = document.getElementById('reset-nom');
   let field_prenom = document.getElementById('reset-prenom');
   let field_role = document.getElementById('reset-role');
   let field_email = document.getElementById('reset-email');
   field_nom.value = nom;
   field_prenom.value = prenom;
   field_role.value = role;
   field_email.value = email;
}

function closeResetModal() {
   let modal = document.getElementsByClassName('reset-modal')[0]
   modal.style.display = 'none';
}

function searchUser() {
   let query = document.getElementById('query').value.toLowerCase();
   let users = document.getElementsByClassName('user');
   let result_field = document.getElementById('result-field')
   let result = 0;
   let cancel_search = document.getElementById('cancel-search');
   for (let i = 0; i < users.length; i++) {
      const user = users[i];
      let name = users[i].getElementsByClassName('user-name')[0].innerHTML.toLowerCase();
      let email = users[i].getElementsByClassName('user-email')[0].innerHTML.toLowerCase();
      if(name.includes(query) || email.includes(query)) {
         user.style.display = 'table-row';
         result++;
      }
      else {
         user.style.display = 'none';
      }
   }
   if(result == 0) {
      result_field.style.display = 'block';
      result_field.innerHTML = 'Aucun résultat trouvé';
   } else if(result == 1) {
      result_field.style.display = 'block';
      result_field.innerHTML = '1 résultat trouvé';
   }
   else {
      result_field.style.display = 'block';
      result_field.innerHTML = `${result} résultats trouvés`;
   }
   if(query.length > 0) {
      cancel_search.style.display = 'block'
   }
}


function searchAdherent() {
   let query = document.getElementById('query').value.toLowerCase();
   let users = document.getElementsByClassName('adherent');
   let result_field = document.getElementById('result-field')
   let result = 0;
   let cancel_search = document.getElementById('cancel-search');
   for (let i = 0; i < users.length; i++) {
      const user = users[i];
      let entreprise = users[i].getElementsByClassName('adherent-entreprise')[0].innerHTML.toLowerCase();
      let email = users[i].getElementsByClassName('adherent-email')[0].innerHTML.toLowerCase();
      if(entreprise.includes(query) || email.includes(query)) {
         user.style.display = 'table-row';
         result++;
      }
      else {
         user.style.display = 'none';
      }
   }
   if(result == 0) {
      result_field.style.display = 'block';
      result_field.innerHTML = 'Aucun résultat trouvé';
   } else if(result == 1) {
      result_field.style.display = 'block';
      result_field.innerHTML = '1 résultat trouvé';
   }
   else {
      result_field.style.display = 'block';
      result_field.innerHTML = `${result} résultats trouvés`;
   }
   if(query.length > 0) {
      cancel_search.style.display = 'block'
   }
}

function cancelSearch() {
   let cancel_search = document.getElementById('cancel-search');
   cancel_search.style.display = 'none'
   let query = document.getElementById('query');
   query.value = '';
   searchUser();
}

function cancelAdherentSearch() {
   let cancel_search = document.getElementById('cancel-search');
   cancel_search.style.display = 'none'
   let query = document.getElementById('query');
   query.value = '';
   searchAdherent();
}