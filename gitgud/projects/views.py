from django.shortcuts import render, get_object_or_404, redirect
from .models import Project, Task, Comment
from .utils import run_linter, auto_fix

def project_list(request):
    projects = Project.objects.filter(status='approved')
    return render(request, 'projects/list.html', {'projects': projects})

def review_project(request, project_id):
    project = get_object_or_404(Project, id=project_id)
    review = run_linter(project.code)

    if request.method == 'POST':
        project.code = auto_fix(project.code)
        project.save()
        return redirect('project_detail', project_id=project.id)

    return render(request, 'projects/review.html', {
        'project': project,
        'review': review
    })
