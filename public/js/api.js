/** @format */

async function loadServices() {
  try {
    const serviceSection = $("section#services");
    const serviceWidgetContainer = $("#service-widget-holder");

    serviceWidgetContainer.innerHTML = "";

    const resourceUrl = `/api/service?visible=true`;

    const response = await fetch(resourceUrl);
    const services = (await response.json()).data;

    if (!services.length) {
      serviceSection.style.display = "none";
    } else {
      serviceSection.style.display = "block";

      services.forEach((service) => {
        serviceWidgetContainer.innerHTML += renderServiceWidget(service);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadExperiences() {
  try {
    const experienceSection = $("#experience");
    const experienceWidgetHolder = $("#experience-widget-holder");

    experienceWidgetHolder.innerHTML = "";

    const entries = 3;
    const pageIndex = 1;
    const resourceUrl = `/api/experience?entries=${entries}`;

    const response = await fetch(resourceUrl);
    const experiences = (await response.json()).data.chunk;

    if (!experiences.length) {
      experienceSection.style.display = "none";
    } else {
      experienceSection.style.display = "block";

      experiences.forEach((experience) => {
        experienceWidgetHolder.innerHTML += renderExperienceWidget(experience);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadExperties() {
  try {
    const expertiseSection = $("#work-expertise");
    const expertiseWidgetHolder = $("#expertise-widget-holder");
    expertiseWidgetHolder.innerHTML = "";

    const resourceUrl = `/api/expertise`;

    const response = await fetch(resourceUrl);
    const expertise = (await response.json()).data;

    if (!expertise.length) {
      expertiseSection.style.display = "none";
    } else {
      expertiseSection.style.display = "block";

      expertise.forEach((skill) => {
        expertiseWidgetHolder.innerHTML += renderExpertiseWidget(skill);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadProjects() {
  try {
    const projectSection = $("#my-works");
    const projectWidgetHolder = $("#project-widget-holder");
    projectWidgetHolder.innerHTML = "";

    const resourceUrl = `/api/project?visible=true`;

    const response = await fetch(resourceUrl);
    const projects = (await response.json()).data;

    if (!projects.length) {
      projectSection.style.display = "none";
    } else {
      projectSection.style.display = "block";

      projects.forEach((project) => {
        projectWidgetHolder.innerHTML += renderProjectWidget(project);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadBlog() {
  try {
    const blogSection = $("#blogs");
    const blogWidgetHolder = $("#blog-widget-holder");
    blogWidgetHolder.innerHTML = "";

    const resourceUrl = `/api/blog`;

    const response = await fetch(resourceUrl);
    const blogs = (await response.json()).data;

    if (!blogs.length) {
      blogSection.style.display = "none";
    } else {
      blogSection.style.display = "block";

      blogs.forEach((blog) => {
        blogWidgetHolder.innerHTML += renderBlogWidget(blog);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function loadProfile() {
  try {
    const profileImageElem = document.getElementById("profile-image");
    const emailElem = document.getElementById("profile-email");
    const languageElem = document.getElementById("profile-languages");
    const nationalityElem = document.getElementById("profile-nationality");
    const githubElem = document.getElementById("profile-github");
    const bio = document.getElementById("profile-bio");

    const resourceUrl = `/api/profile`;

    const response = await fetch(resourceUrl);
    const profile = (await response.json()).data;

    profileImageElem.style.backgroundImage = `url('${profile.dp}')`;
    emailElem.textContent = profile.email;
    languageElem.textContent = profile.languages;
    githubElem.innerHTML = `<a href="${profile.github}" style="color: inherit">${profile.github}</a>`;
    bio.textContent = profile.bio;
  } catch (e) {
    console.error(e);
  }
}

// Widgets
function renderServiceWidget(service) {
  const { icon, title, take, _id } = service;
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
                </div>
            </div>
        `;

  return widget;
}

function renderExperienceWidget(experience) {
  const {
    title,
    icon,
    company,
    company_link,
    experience: take,
    from,
    to,
    _id,
  } = experience;
  let takeExtract = take.substring(0, 200);

  const widget = `
                <div class="timeline-slot">
                    <a href="/experience/${_id}">
                        <div class="timeline-head">
                            <div class="timeline-icon text-primary">
                            <i class="fas ${icon}"></i>
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
                            ${takeExtract}...
                            </div>
                        </div>
                    </a>
                </div>
    `;

  return widget;
}

function renderExpertiseWidget(expertise) {
  const { icon, name, rating, _id } = expertise;
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
  const { title, category, imageHero, _id } = project;
  const widget = `
                <div
                    class="slot"
                    style="background-image: url('${imageHero.url}')"
                >
                <a href="/project/${_id}">
                  <div class="slot-content">
                  <div class="slot-name font-600">${title}</div>
                  <div class="slot-category text-tiny">${category}</div>
                  </div>
                </a>
                </div>
    `;

  return widget;
}

function renderBlogWidget(blog) {
  const { title, image, link, extract, date, id } = blog;

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
    `;

  return widget;
}

function init() {
  loadServices();
  loadExperiences();
  loadExperties();
  loadProjects();
  loadBlog();
  loadProfile();
}

init();
