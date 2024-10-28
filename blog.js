document.addEventListener("DOMContentLoaded", () => {
    const blogForm = document.getElementById("blogForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const postIdInput = document.getElementById("postId");
    const blogPosts = document.getElementById("blogPosts");

    // Función para cargar las publicaciones desde localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem("blogPosts")) || [];
        blogPosts.innerHTML = "";
        posts.forEach((post, index) => {
            const postDiv = document.createElement("div");
            postDiv.className = "post";

            postDiv.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content}</p>
                <button onclick="editPost(${index})">Editar</button>
                <button onclick="deletePost(${index})">Eliminar</button>
            `;
            blogPosts.appendChild(postDiv);
        });
    }

    // Función para guardar una publicación nueva o editada
    function savePost(event) {
        event.preventDefault();
        const title = titleInput.value;
        const content = contentInput.value;
        const postId = postIdInput.value;

        let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

        if (postId) {
            // Editar publicación existente
            posts[postId] = { title, content };
            postIdInput.value = ""; // Limpiar el campo de ID
        } else {
            // Nueva publicación
            posts.push({ title, content });
        }

        localStorage.setItem("blogPosts", JSON.stringify(posts));
        blogForm.reset();
        loadPosts();
    }

    // Función para editar una publicación
    window.editPost = function(index) {
        const posts = JSON.parse(localStorage.getItem("blogPosts"));
        const post = posts[index];
        titleInput.value = post.title;
        contentInput.value = post.content;
        postIdInput.value = index;
    };

    // Función para eliminar una publicación
    window.deletePost = function(index) {
        let posts = JSON.parse(localStorage.getItem("blogPosts"));
        posts.splice(index, 1);
        localStorage.setItem("blogPosts", JSON.stringify(posts));
        loadPosts();
    };

    // Cargar las publicaciones al iniciar
    loadPosts();

    // Guardar publicación al enviar el formulario
    blogForm.addEventListener("submit", savePost);
});
