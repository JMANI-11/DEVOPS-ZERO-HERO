# -*- coding: utf-8 -*-

import datetime

from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from IMPLEMENTATION.models import Post
from IMPLEMENTATION.models import Selection
from django.views.generic import TemplateView
from IMPLEMENTATION.forms import SignUpForm
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
#from django.contrib.auth.forms import UserCreationForm


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('login')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})


@login_required()
@csrf_exempt
def twomatchresult(request):
    template_response = 'twomatchresponse.html'


    # Do not accept response after 4 pm
    now = datetime.datetime.now()
    if now.hour > 15:
        return HttpResponse("You are late, Responses are accepted only before 4pm")


    # Check if response was already submitted
    username = request.user.get_username()
    fmt = '%Y%m%d'
    today = datetime.datetime.now().strftime(fmt)
    submission = Selection.objects.filter(user=username, date=today).values_list('choice1', flat=True)
    if submission:
        return HttpResponse("We have already received your response, Thank you.")

    formdata = request.POST
    selection1 = formdata['PickTheBest1']
    selection2 = formdata['PickTheBest2']
    if not selection1:
        return HttpResponse("Please pick your team for both the matches")
    if not selection1:
        return HttpResponse("Please pick your team for both the matches")
    username = request.user.get_username()
    fmt = '%Y%m%d'
    today = datetime.datetime.now().strftime(fmt)
    event = Post.objects.get(date=today)
    p = Selection(user=username, match1=event.match1, match2=event.match2, date=today, choice1=selection1, choice2=selection2, points=0)
    p.save()
    return render(request, template_response, {'response1': selection1, 'response2': selection2})


@login_required()
@csrf_exempt
def singlematchresult(request):
    template_response = 'onematchresponse.html'
    
    # Do not accept response after 4 pm
    now = datetime.datetime.now()
    if now.hour > 15:
        return HttpResponse("You are late, Responses are accepted only before 4pm")


    # Check if response was already submitted
    username = request.user.get_username()
    fmt = '%Y%m%d'
    today = datetime.datetime.now().strftime(fmt)
    submission = Selection.objects.filter(user=username, date=today).values_list('choice1', flat=True)
    if submission:
        return HttpResponse("We have already received your response, Thank you.")

    formdata = request.POST
    selection1 = formdata['PickTheBest1']
    username = request.user.get_username()
    fmt = '%Y%m%d'
    today = datetime.datetime.now().strftime(fmt)
    event = Post.objects.get(date=today)
    p = Selection(user=username, match1=event.match1, date=today, choice1=selection1, points=0)
    p.save()
    return render(request, template_response, {'response': selection1})


@login_required()
@csrf_exempt
def score(request):
    template_score = 'score.html'

    username = request.user.get_username()
    date = Selection.objects.filter(user=username).values_list('date', flat=True)
    match1 = Selection.objects.filter(user=username).values_list('match1', flat=True)
    match2 = Selection.objects.filter(user=username).values_list('match2', flat=True)
    points = Selection.objects.filter(user=username).values_list('points', flat=True)
    choice1 = Selection.objects.filter(user=username).values_list('choice1', flat=True)
    choice2 = Selection.objects.filter(user=username).values_list('choice2', flat=True)
    return render(request, template_score, {'date': date, 'points': points, 'match1': match1, 'match2': match2,
                                            'choice2': choice2, 'choice1': choice1})


@csrf_exempt
def leaderboard(request):
    template_leader = 'leaderboard.html'
    chart = Selection.objects.raw("select id, user, SUM(points) as leader from IMPLEMENTATION_selection group by user order by SUM(points) DESC;")
    return render(request, template_leader, {'chart': chart})


class MainView(TemplateView):
    template_twomatches = 'twomatches.html'
    template_singlematch = 'singlematch.html'

    @csrf_exempt
    @method_decorator(login_required)
    def get(self, request):

        #Get time in required format
        fmt = '%Y%m%d'
        today = datetime.datetime.now().strftime(fmt)

        event = Post.objects.get(date=today)
        # If there are two matches per day
        if event.match2:
            first = event.match1.split("vs")
            second = event.match2.split("vs")
            return render(request, self.template_twomatches, {'team1': first[0].strip(" "), 'team2': first[1].strip(" "),
                                                        'team3': second[0], 'team4': second[1]})
        else:
            first = event.match1.split("vs")
            return render(request, self.template_singlematch, {'team1': first[0].strip(" "), 'team2': first[1].strip(" ")})
