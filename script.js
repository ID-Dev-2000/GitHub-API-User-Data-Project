// Establish structural DOM elements
let userNameInput = document.getElementById('userNameInput')
let userDataDisplay = document.getElementById('userDataID')
let usernameStatus = document.getElementById('usernameStatus')

// Fetch and return API data
async function fetchUserData() {
    try {
        let username = userNameInput.value
        let fetchCall = await fetch(`https://api.github.com/users/${username}`)
        if(fetchCall.ok == false && fetchCall.status == 403){
            usernameStatus.style.color = "red"
            usernameStatus.innerHTML = "STATUS: API OVERLOADED PROTECTION - PLEASE WAIT 1 HOUR"
            return
        } else if(fetchCall.ok == false) {
            usernameStatus.style.color = "red"
            usernameStatus.innerHTML = "STATUS: INVALID USERNAME"
            return  
        } else {
            usernameStatus.style.color = "black"
            usernameStatus.innerHTML = "STATUS: VALID USERNAME"
            return fetchCall.json()  
        }
    } catch (error) {
        console.log(error)
    }
}

// Establish user-related DOM elements
let userDisplayName = document.getElementById('userDisplayName')
let userHTMLURL = document.getElementById('userHTMLURL')
let userProfilePicture = document.getElementById('userProfilePicture')
let userReposLink = document.getElementById('userReposLink')
let userAccountCreationDate = document.getElementById('userAccountCreationDate')
let userFollowerCount = document.getElementById('userFollowerCount')
let userFollowingCount = document.getElementById('userFollowingCount')

// Enter Key functionality on input
userNameInput.addEventListener("keydown", function(event)
{
    if (event.key === "Enter") {
        displayUserData()
    }
})

// Reset user data elements to default
function resetUserDataToDefault() {
    userDisplayName.innerHTML = "USERNAME: N/A"
    userHTMLURL.innerHTML = "LINK TO ACCOUNT: N/A"
    userProfilePicture.src = "./IMAGES/NA_BLANK_IMAGE.png"
    userReposLink.innerHTML = "LINK TO REPOS: N/A"
    userAccountCreationDate.innerHTML = "ACCOUNT CREATION DATE: N/A"
    userFollowerCount.innerHTML = "FOLLOWER COUNT: N/A"
    userFollowingCount.innerHTML = "FOLLOWING COUNT: N/A"
    usernameStatus.style.color = "black"
    usernameStatus.innerHTML = "STATUS: N/A"
}

// Assign user JSON data to elements
async function displayUserData() {
    let userDataAsJson = await fetchUserData()
    userDisplayName.innerHTML = `USERNAME: ${userDataAsJson.login}`
    userHTMLURL.innerHTML = `LINK TO ACCOUNT: <a href="${userDataAsJson.html_url}" target="_blank">HERE</a>`
    userProfilePicture.src = userDataAsJson.avatar_url
    userReposLink.innerHTML = `LINK TO REPOS: <a href="${userDataAsJson.html_url + "?tab=repositories"}" target="_blank">HERE</a>`
    userAccountCreationDate.innerHTML = `ACCOUNT CREATION DATE: ${userDataAsJson.created_at.substring(0,10)}`
    userFollowerCount.innerHTML = `FOLLOWER COUNT: ${userDataAsJson.followers}`
    userFollowingCount.innerHTML = `FOLLOWING COUNT: ${userDataAsJson.following}`
}
