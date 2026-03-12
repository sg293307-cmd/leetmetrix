document.addEventListener("DOMContentLoaded", function() {
    const searchbutton = document.getElementById("search");
    const usernameInput = document.getElementById("username");
    const statsconatainer = document.querySelector(".stats-container");
    const easycircle = document.querySelector(".easy");
    const mediumcircle = document.querySelector(".medium");
    const hardcircle = document.querySelector(".hard");
    const easylabel = document.getElementById("easy-label");
    const mediumlabel = document.getElementById("medium-label");
    const hardlabel = document.getElementById("hard-label");
    const cardStatsconatiner = document.querySelector(".stats-card");

    //  fucntion to check for valid username
    function validateusername(usernam){
        if(usernam.trim()===""){
            alert("Username cannot be empty.");
                return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching =regex.test(usernam);
        if(!isMatching){
            alert("Inavlid Username");
        }
        return isMatching;
    }
    //  function to fetch api
    async function fetchUserDetail(usernam){
        let parseData;
        const url=`https://leetcode-api-faisalshohag.vercel.app/${usernam}`;
        try{
            searchbutton.textContent= "Searching...";
            searchbutton.disabled = true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch username details.");
            }
             parseData = await response.json();
            console.log("Logging data:", parseData);
        }
        catch(error){
            statsconatainer.innerHTML=`<p>No data found.</p>`;
        }
        finally{
            searchbutton.textContent="Search";
            searchbutton.disabled=false;
        }

        displayUserData(parseData);
    }
    
    function updateProgress(solved, total, label, circle){
        if(!circle){
        console.log("Circle element not found");
        return;
        }

        const progressDegree =(solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent= `${solved}/${total}`;
    }

    function displayUserData(parseData){
        const totalQues = parseData.matchedUserStats.totalSubmissionNum[0].count;
        const totalEasyQues = parseData.matchedUserStats.totalSubmissionNum[1].count;
        const totalMedQues = parseData.matchedUserStats.totalSubmissionNum[2].count;
        const totalHardQues= parseData.matchedUserStats.totalSubmissionNum[3].count;

        const solvedTotalQues = parseData.matchedUserStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parseData.matchedUserStats.acSubmissionNum[1].count;
        const solvedTotalMedQues = parseData.matchedUserStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parseData.matchedUserStats.acSubmissionNum[3].count;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easylabel, easycircle);
        updateProgress(solvedTotalMedQues, totalMedQues, mediumlabel, mediumcircle);
        updateProgress(solvedTotalHardQues,totalHardQues, hardlabel, hardcircle);

    
    }   
    searchbutton.addEventListener('click', function(){
        const usernam = usernameInput.value;
        console.log("Logging username:",usernam);

        if(validateusername(usernam)){
            fetchUserDetail(usernam);
        }
    })
})