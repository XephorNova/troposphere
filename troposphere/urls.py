from django.conf.urls import patterns, include, url
from troposphere import settings
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

user_match = "[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*"
ui_urlpatterns = patterns('',
    url(r'^tropo-admin/', include(admin.site.urls)),
    url(r'^$', 'troposphere.views.root'),
    url(r'^application/emulate$', 'troposphere.views.unemulate',
        name='unemulate-user'),
    url(r'^application/emulate/(?P<username>(%s))$' % user_match, 'troposphere.views.emulate',
        name='emulate-user'),
    url(r'^application', 'troposphere.views.application', name='application'),
    url(r'^atmo_maintenance$', 'troposphere.views.atmo_maintenance', name='atmo_maintenance'),
    url(r'^maintenance$', 'troposphere.views.maintenance', name='maintenance'),
    url(r'^forbidden$', 'troposphere.views.forbidden', name='forbidden'),
    url(r'^login$', 'troposphere.views.login'),
    url(r'^logout$', 'troposphere.views.logout'),
    url(r'^cas/oauth2.0$', 'troposphere.views.cas_oauth_service',
        name='cas_oauth_service'),
    url(r'^version$', 'troposphere.views.version'),
    url(r'^tests$', 'troposphere.views.tests'),
    url(r'^tropo-api/', include('api.urls')),
)

urlpatterns = patterns('',
    url(r'^%s' % settings.BASE_URL, include(ui_urlpatterns))
    )
urlpatterns += staticfiles_urlpatterns()
