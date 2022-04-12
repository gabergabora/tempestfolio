const baseurl = 'http://localhost:3000';

async function loadServices(){
        const serviceContianer = $('#service-widget-holder')
        const resourceUrl = `${baseurl}/api/service?visible=true`;

        const response = await fetch(resourceUrl) ;
        const services = await response.json();

        (services.data).forEach(service => {
            serviceContianer.innerHTML += renderServiceWidget(service);
        });
}

async function loadExperiences(){
        const experienceContianer = $('#experience-widget-holder');
        experienceContianer.innerHTML = "";

        const entries = 3;
        const pageIndex = 1;
        const resourceUrl = `${baseurl}/api/experience?entries=${entries}`;

        const response = await fetch(resourceUrl) ;
        const experiences = await response.json();

        (experiences.data.chunk).forEach(experience => {
            experienceContianer.innerHTML += renderExperienceWidget(experience);
        });
}

async function loadExperties(){
    const expertiseContianer = $('#expertise-widget-holder');

    const resourceUrl = `${baseurl}/api/expertise`;

    const response = await fetch(resourceUrl) ;
    const expertise = await response.json();

    (expertise.data).forEach(skill => {
        expertiseContianer.innerHTML += renderExpertiseWidget(skill);
        console.log(skill)
    });
}


async function loadProjects(){
    const projectContianer = $('#project-widget-holder');
    projectContianer.innerHTML = "";

    const resourceUrl = `${baseurl}/api/project?visible=true`;

    const response = await fetch(resourceUrl) ;
    const projects = await response.json();

    (projects.data).forEach(project => {
        projectContianer.innerHTML += renderProjectWidget(project);
    });
}

async function loadBlog(){
    const blogContianer = $('#blog-widget-holder');

    const resourceUrl = `${baseurl}/api/blog`;

    const response = await fetch(resourceUrl) ;
    const blogs = await response.json();

    (blogs.data).forEach(blog => {
        blogContianer.innerHTML += renderBlogWidget(blog);
    });
}



// Widgets
function renderServiceWidget(service) {
        const {icon, title, take, _id} = service;
        const widget = `
            <div class="card">
                <h2 class="service-icon text-lg">
                    <i class="fa ${icon}"></i>
                </h2>
                <div class="service-text">
                    <h3 class="service-text-title text-dark">${title}</h3>
                    <div class="services-text-content text-sm text-secondary">
                    ${take}
                    </div>
                    <div class="service-link">
                    <a href="#" class=""> Read more </a>
                    </div>
                </div>
            </div>
        `;

        return widget;
}

function renderExperienceWidget(experienc) {
    const {title, icon, company, company_link, experience:take, from, to, _id} = experienc;

    const widget = `
                <div class="timeline-slot">
                    <a href="#timeline">
                        <div class="timeline-head">
                            <div class="timeline-icon text-primary">
                            <i class="fas fa-users"></i>
                            </div>
                            <div class="job-duration text-tiny font-700 text-primary">
                            ${from} - ${to}
                            </div>
                        </div>
                        <div class="timeline-body">
                            <div class="job-title text-md font-400">
                            ${title}
                            </div>
                            <div class="job-company text-tiny">
                            <span class="company"> ${company} </span>
                            <span class="position"> Dev-Ops </span>
                            </div>
                            <div class="job-description text-secondary">
                            ${take}
                            ${take}
                            ${take}
                            </div>
                        </div>
                    </a>
                </div>
    `;

    return widget;
}

function renderExpertiseWidget(expertise) {
    const {icon, name, rating, _id} = expertise;
    const widget = `
            <div class="skill">
                <img
                    class="skill-thumb"
                    id="${name}"
                    src="${icon.url}"
                    alt=""
                />
                <span class="skill-rating text-tiny text-primary font-600"
                >${rating}%</span
                >
            </div>
    `;

    return widget;
}

function renderProjectWidget(project) {
    const {title, category, imageHero, _id} = project;
    const widget = `
                <div
                    class="slot"
                    style="background-image: url('${imageHero.url}')"
                >
                <div class="slot-content">
                <div class="icon">
                    <a href="#">
                    <i class="fas fa-eye"></i>
                    </a>
                </div>
                <div class="slot-name font-600">${title}</div>
                <div class="slot-category text-tiny">${category }</div>
                </div>
            </div>
    `;

    return widget;
}

function renderBlogWidget(blog){
    const {title, image, link, extract, date, id} = blog;

    const widget = `
            <div class="blog-card card">
                <div class="blog-image">
                    <img src="${image}" alt="" />
                </div>
                <div class="blog-info">
                    <div class="blog-title text-md font-600 mb-1">
                    <a href="#"> ${title} </a>
                    </div>
                    <div class="blog-subtext text-secondary text-sm mb-1">
                        ${extract}
                    </div>
                    <div class="blog-links text-tiny">
                    <a href="${link}" class="date"
                        ><i class="far fa-calendar-alt"></i> ${date} </a
                    >
                    <a href="${link}" class="link">Read More</a>
                    </div>
                </div>
            </div>
    `

    return widget;

}



function init(){
    loadServices();
    loadExperiences();
    loadExperties();
    loadProjects();
    loadBlog();
}


init();