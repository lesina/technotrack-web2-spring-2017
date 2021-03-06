from django.shortcuts import render, get_object_or_404
from django.views.generic import DetailView, UpdateView, ListView
from .models import User, AccountValidation
from django.views.generic.edit import CreateView
from django.urls import reverse
from django.contrib.auth.views import LoginView as BaseLoginView
from django.utils import timezone
from .forms import AuthenticationForm, RegistrationForm
from django.conf import settings
from haystack.query import SearchQuerySet, AutoQuery
from django.http import JsonResponse
import datetime


class UserProfileView(DetailView):
    template_name = 'core/profile.html'
    model = User

    def get_object(self, queryset=None):
        return get_object_or_404(User, pk=self.request.user.pk)

    def get_context_data(self, **kwargs):
        context = super(UserProfileView, self).get_context_data(**kwargs)
        # user = self.request.user

        # print type(user.social_auth.get(provider='vk-oauth2'))
        # print dir(user.social_auth.get(provider='vk-oauth2'))
        # print user.social_auth.get(provider='vk-oauth2')

        # print VKOAuth2.get_scope()
        # print self.request.user.social_auth.get_social_auth(provider='vk-oauth2',uid='e-mail')
        return context


def home(request):
    return render(request, template_name='core/index.html')


class RegisterView(CreateView):
    model = User
    template_name = 'core/registration.html'
    form_class = RegistrationForm
    success_url = 'core:login'

    def get_success_url(self):
        return reverse(self.success_url)


class AccountValidationView(DetailView):
    model = AccountValidation
    template_name = 'core/confirmation.html'
    context_object_name = 'validator'
    slug_url_kwarg = 'slug'
    slug_field = 'uuid'
    query_pk_and_slug = True

    def get_context_data(self, **kwargs):
        context = super(AccountValidationView, self).get_context_data(**kwargs)
        obj = context.get('object')
        if obj and not obj.confirmed:
            if (timezone.now() - obj.created) < datetime.timedelta(settings.ACCOUNT_ACTIVATION_DAYS):
                context['expired'] = False
                context['validator'].confirm()
            else:
                context['expired'] = True
                context['validator'].update_uuid()
        else:
            context['validator'] = None
        return context


class LoginView(BaseLoginView):
    form_class = AuthenticationForm

    def __init__(self, **kwargs):
        super(LoginView, self).__init__(**kwargs)


class UserListView(ListView):
    model = User
    template_name = 'core/user_list.html'

    def get_queryset(self):
        sqs = SearchQuerySet()
        sqs = sqs.models(self.model)
        query = self.request.GET.get('query')
        if query:
            sqs = sqs.filter(text=AutoQuery(query))
        return sqs.load_all()

    def render_to_response(self, context, **response_kwargs):
        if self.request.is_ajax() or 1 is 1:
            data = [
                # 'status': 'ok',
                # 'results': [
                    {
                        'id': x.object.id,
                        'username': x.object.username,
                        'first_name': x.object.first_name,
                        'last_name': x.object.last_name,
                        # 'avatar': x.object.avatar,

                    }
                    for x in context['object_list']
                # ]
            ]
            response = JsonResponse(data, safe=False ,**response_kwargs)
        else:
            response = super(UserListView, self).render_to_response(
                context,
                **response_kwargs
            )
        return response
