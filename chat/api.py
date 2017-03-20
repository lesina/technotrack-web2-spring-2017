from rest_framework import serializers, viewsets, permissions
from .models import Chat, UserChat, Message
from application.api import router
from core.models import User
from core.api import UserSerializer
from .permissions import IsOwnerOrReadOnly
from django.db.models import Q
from application.settings import AUTH_USER_MODEL



class MessageSerializer(serializers.HyperlinkedModelSerializer):
    # author = serializers.HiddenField(default='author.id')
    # chat = ChatSerializer()
    # author = serializers.ReadOnlyField()

    def validate(self, data):
        if UserChat.objects.filter(Q(user=data['author']) & Q(chat=data['chat'])).exists():
            return data
        else:
            raise serializers.ValidationError("Not in chat")

    class Meta:
        model = Message
        fields = ['content', 'author', 'created', 'chat']


class ChatSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.id')
    #messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ['pk', 'title', 'author', 'created', ]
        depth = 1


class UserChatSerializer(serializers.HyperlinkedModelSerializer):
    # user = UserSerializer()
    #chat = ChatSerializer()

    class Meta:
        model = UserChat
        fields = ['chat', 'user']
        #depth = 1


class ChatViewSet(viewsets.ModelViewSet):

    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        q = super(ChatViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            username = self.request.query_params.get('username')
            # q = q.filter(author__username=self.request.query_params.get('username'))
            q = q.filter(chats__user__username=username)
            #print(q)
        return q


class UserChatViewSet(viewsets.ModelViewSet):
    queryset = UserChat.objects.all()
    serializer_class = UserChatSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        q = super(UserChatViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            q = q.filter(user__username=self.request.query_params.get('username'))
        return q


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        q = super(MessageViewSet, self).get_queryset()
        #username = self.request.query_params.get('username')
        q = q.filter(chat__chats__user__username=self.request.user)
        return q

router.register('chats', ChatViewSet)
router.register('userchats', UserChatViewSet)
router.register('messages', MessageViewSet)